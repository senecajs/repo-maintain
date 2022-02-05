module.exports = {
  runChecks: async function (Plugins) {
    // Node modules
    const Path = require('path')

    // External modules
    const Hoek = require('@hapi/hoek')
    const Marked = require('marked')

    // Internal modules
    const { checkList } = require('../design/checks/checks')
    const { gatherData } = require('./gatherData')
    const defineChecks = checkOperations()

    // runChecks()
    // async function runChecks() {
    let allResults = {}
    for (let i = 0; i < Plugins.length; i++) {
      let item = Plugins[i]
      let results = {}
      // console.log('[[ gatherData ]]')
      let plugin = await gatherData(item, checkList)
      console.log(plugin.data.full_name)
      for (checkName in plugin.checks) {
        let checkDetails = plugin.checks[checkName]
        checkDetails.name = checkName

        let checkKind = defineChecks[checkDetails.kind]
        if (null == checkKind) {
          console.log(
            'WARNING',
            'Check does not exist',
            checkName,
            checkDetails.kind
          )
          continue
        }
        let res = await checkKind(checkDetails, plugin.data)
        results[checkName] = res
      }
      allResults[item.full_name] = {
        data: plugin.data,
        checks: results,
      }
    }
    return allResults
    // }

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
              // extensibility goes here - searching for value and not key
              console.log('Content type not recognised. ', checkDetails.name)
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
            // Reassignement of #1 heading text
            searchArray[0].text = pluginData.package_name

            let fileContent = pluginData[file]
            // Creating AST from file
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
                  let nb = i + 1
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
              // extensibility goes here - searching for value and not key
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
