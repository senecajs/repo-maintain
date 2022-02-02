module.exports = {
  gatherData: function (apiData, filesReq) {
    // Node modules
    const Fs = require('fs')

    // External modules
    const Fetch = require('node-fetch') // v3 only supports ESM - switch?

    reqData = {}
    reqData.full_name = apiData.full_name
    reqData.html_url = apiData.html_url
    reqData.language = apiData.language
    reqData.default_branch = apiData.default_branch
    reqData.forks_count = apiData.forks_count
    reqData.stargazers_count = apiData.stargazers_count
    reqData.open_issues = apiData.open_issues

    for (let i = 0; i < filesReq; i++) {
      let fileName = filesReq[i]
      let url =
        'https://raw.githubusercontent.com/' +
        apiData.full_name +
        '/master/' +
        fileName

      const fileRaw = await Fetch(url)
      if (fileRaw.ok) {
        let fileContent = await fileRaw.text()
        reqData[fileName] = fileContent
      }
    }

    return reqData
  },
}
