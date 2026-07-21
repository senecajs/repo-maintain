module.exports = {
  gatherData: async function (apiData, checkList) {
    const Path = require('path')
    const Fetch = require('node-fetch')

    let reqData = {}
    reqData.full_name = apiData.full_name
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

    let filesReq = {}
    let relCheckList = {}
    for (checkName in checkList) {
      let checkDetails = checkList[checkName]
      if (config.includes(checkDetails.config)) {
        filesReq[checkDetails.file] = null
        relCheckList[checkName] = checkDetails
      }
    }

    // Fetches a single file and returns { fileName, fileContent } or null on failure
    const fetchFile = async (fileName) => {
      if (null == fileName) return null

      const url =
        'https://raw.githubusercontent.com/' +
        apiData.full_name +
        '/' + apiData.default_branch + '/' +
        fileName

      let fileRaw
      try {
        fileRaw = await Fetch(url)
      } catch (err) {
        // DNS lookup errors may occur randomly - wait and retry once before giving up
        await new Promise((resolve) => setTimeout(resolve, 1000))
        try {
          fileRaw = await Fetch(url)
        } catch (err) {
          return null
        }
      }

      if (!fileRaw.ok) return null

      let fileContent
      if ('.json' == Path.extname(url)) {
        try {
          fileContent = await fileRaw.json()
        } catch (err) {
          return null
        }
      } else {
        fileContent = await fileRaw.text()
      }

      return { fileName, fileContent }
    }

    // Fetch all files in parallel instead of sequentially
    const fileNames = Object.keys(filesReq)
    const results = await Promise.all(fileNames.map(fetchFile))

    // Process results and populate reqData
    results.forEach((result) => {
      if (result == null) return
      reqData[result.fileName] = result.fileContent

      // Extract package name from package.json
      if ('package.json' == result.fileName) {
        reqData.package_name = result.fileContent.name
      }
    })

    return {
      data: reqData,
      checks: relCheckList,
    }
  },
}