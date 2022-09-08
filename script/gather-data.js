module.exports = {
  gatherData: async function (apiData, exclChecks, inclChecks) {
    // Node modules
    const Path = require('path')

    // External modules
    const { checkList } = require('@seneca/maintain')
    const Fetch = require('node-fetch') // v3 only supports ESM - switch?

    let reqData = {}
    reqData.full_name = apiData.full_name
    reqData.org_name = apiData.owner.login
    reqData.package_name = apiData.name
    reqData.html_url = apiData.html_url
    reqData.language = apiData.language
    reqData.default_branch = apiData.default_branch
    reqData.forks_count = apiData.forks_count
    reqData.stargazers_count = apiData.stargazers_count
    reqData.open_issues = apiData.open_issues

    let config = ['base']
    let lang = apiData.language
    switch (lang) {
      case 'JavaScript':
        config.push('js')
        break

      case 'TypeScript':
        config.push('ts')
        break
    }

    let relCheckList = checkList({
      config: config,
      inclChecks: inclChecks,
      exclChecks: exclChecks,
    })

    let filesReq = {}
    for (checkName in relCheckList) {
      let checkDetails = relCheckList[checkName]
      filesReq[checkDetails.file] = null
    }
    for (let i = 0; i < Object.keys(filesReq).length; i++) {
      let fileName = Object.keys(filesReq)[i]
      let fileContent = null
      if (null == fileName) continue
      let url =
        'https://raw.githubusercontent.com/' +
        apiData.full_name +
        '/master/' +
        fileName

      // DNS lookup errors at random causing stop to program
      // If fetch request fails, wait - try again - move on if unsuccessful
      let fileRaw = Promise
      try {
        fileRaw = await Fetch(url)
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 7777))
        try {
          fileRaw = await Fetch(url)
        } catch (err) {
          continue
        }
      }

      if (fileRaw.ok) {
        if ('.json' == Path.extname(url)) {
          try {
            fileContent = await fileRaw.json()
          } catch (err) {
            continue
          }
        } else {
          fileContent = await fileRaw.text()
        }
        reqData[fileName] = fileContent
      }
    }

    return {
      data: reqData,
      checks: relCheckList,
    }
  },
}
