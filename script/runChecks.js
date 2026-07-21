module.exports = {
  runChecks: async function (Plugins, concurrency = 5) {
    const Path = require('path')
    const Hoek = require('@hapi/hoek')
    const Marked = require('marked')
    const { checkList } = require('../checks/checks')
    const { gatherData } = require('./gatherData')
    const defineChecks = checkOperations()

    console.log('\nChecks function initiated.\n')
    let allResults = {}

    // Process a single plugin and return its results
    const processPlugin = async (item, index) => {
      let results = {}
      let plugin = await gatherData(item, checkList)

      console.log(`[ ${index + 1} of ${Plugins.length} ] ${plugin.data.full_name}`)

      for (checkName in plugin.checks) {
        let checkDetails = plugin.checks[checkName]
        checkDetails.name = checkName

        let checkKind = defineChecks[checkDetails.kind]
        if (null == checkKind) {
          console.info('WARNING', 'Check does not exist', checkName, checkDetails.kind)
          continue
        }
        let res = await checkKind(checkDetails, plugin.data)
        results[checkName] = res
      }

      return { full_name: item.full_name, data: plugin.data, checks: results }
    }

    // Process plugins in batches to avoid overwhelming the GitHub API
    for (let i = 0; i < Plugins.length; i += concurrency) {
      const batch = Plugins.slice(i, i + concurrency)
      const batchResults = await Promise.all(
        batch.map((item, idx) => processPlugin(item, i + idx))
      )
      batchResults.forEach((result) => {
        allResults[result.full_name] = {
          data: result.data,
          checks: result.checks,
        }
      })
    }

    console.log('Checks complete.')
    return allResults

    function checkOperations() {
      return {
        file_exist: async function (checkDetails, pluginData) {
          let file = checkDetails.file
          let pass = Object.keys(pluginData).includes(file)
          let why = 'file_not_found'
          if (pass) {
            why = 'file_found'
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },

        fileX_exist_if_contain_json: async function (checkDetails, pluginData) {
          let file = checkDetails.file
          let fileX = checkDetails.fileX
          let pass = Object.keys(pluginData).includes(file)
          let why = 'json_file_not_found'
          let searchContent = checkDetails.contains
          let searchIsNot = checkDetails.contains_is_not
          let containsType = checkDetails.contains_type
          let config = checkDetails.config
          let searchIs = ''

          if (pass) {
            let fileContent = pluginData[file]
            if ('key' == containsType) {
              searchIs = Hoek.reach(fileContent, searchContent)
              pass = null != searchIs && searchIsNot != searchIs
            } else {
              pass = false
            }

            if (pass) {
              switch (config) {
                case 'js':
                  fileX = searchIs
                  pass = Object.keys(pluginData).includes(fileX)
                  break

                case 'ts':
                  fileX = Path.basename(searchIs, '.js') + '.ts'
                  pass = Object.keys(pluginData).includes(fileX)
                  break
              }

              if (pass) {
                why = 'fileX_found'
              } else {
                why = 'fileX_not_found'
              }
            } else {
              why = 'illegal_value'
            }
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },

        content_contain_string: async function (checkDetails, pluginData) {
          let file = checkDetails.file
          let pass = Object.keys(pluginData).includes(file)
          let searchContent = checkDetails.contains
          let why = 'file_not_found'

          if (pass) {
            let fileContent = pluginData[file]
            for (let i = 0; i < searchContent.length; i++) {
              pass = fileContent.includes(searchContent[i])
            }

            if (pass) {
              why = 'content_found'
            } else {
              why = 'content_not_found'
            }
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },

        content_contain_markdown: async function (checkDetails, pluginData) {
          let file = checkDetails.file
          let pass = Object.keys(pluginData).includes(file)
          let why = 'file_not_found'

          // Currently check def is quite specific to readme_headings check
          if (pass) {
            why = 'file_found'
            let searchArray = checkDetails.contains
            // Reassignment of #1 heading text to match package name
            searchArray[0].text = pluginData.package_name

            let fileContent = pluginData[file]
            // Create AST from markdown file
            let lexer = new Marked.Lexer()
            let tokens = lexer.lex(fileContent)
            let headings = tokens.filter(
              (token) =>
                'heading' == token.type &&
                (1 == token.depth || 2 == token.depth)
            )

            if (headings.length == searchArray.length) {
              for (let i = 0; i < searchArray.length; i++) {
                pass =
                  headings[i].depth == searchArray[i].depth &&
                  headings[i].text == searchArray[i].text
                if (!pass) {
                  why = 'heading_"' + searchArray[i].text + '"_not_found'
                  break
                }
              }
            } else {
              pass = false
              why = 'nb_headings_incorrect'
            }
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },

        content_contain_json: async function (checkDetails, pluginData) {
          let file = checkDetails.file
          let pass = Object.keys(pluginData).includes(file)
          let searchContent = checkDetails.contains
          let contentType = checkDetails.contains_type
          let why = 'file_not_found'

          if (pass) {
            let fileContent = pluginData[file]
            if ('key' == contentType) {
              let chain = []
              for (let i = 0; i < searchContent.length; i++) {
                chain.push(searchContent[i])
              }
              pass = null != Hoek.reach(fileContent, chain)
            } else {
              // Extensibility point: searching by value instead of key
              console.log('Content type not recognised. ', checkDetails.name)
              pass = false
            }

            if (pass) {
              why = 'content_found'
            } else {
              why = 'content_not_found'
            }
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },

        check_branch: async function (checkDetails, pluginData) {
          let branch = checkDetails.branch
          let pass = branch == pluginData.default_branch
          let why = 'branch_incorrect'
          let file = 'N/A'

          if (pass) {
            why = 'branch_correct'
          }

          return {
            check: checkDetails.name,
            kind: checkDetails.kind,
            file: file,
            pass: pass,
            why: why,
          }
        },
      }
    }
  },
}