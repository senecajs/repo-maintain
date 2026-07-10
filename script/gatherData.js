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

    // Fetch open PRs and fork status from official senecajs repo
    try {
      const repoName = apiData.full_name.split('/')[1]
      const owner = apiData.full_name.split('/')[0]

      // Check open PRs on official repo
      const prUrl = `https://api.github.com/repos/senecajs/${repoName}/pulls?state=open&per_page=100`
      const prRes = await Fetch(prUrl, {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      const prData = await prRes.json()
      const openPrs = Array.isArray(prData) ? prData : []
      reqData.open_prs = openPrs.length

      // Check if fork from luiz-justino has open PR on official repo
      const luizPr = openPrs.find(pr => pr.head && pr.head.label && pr.head.label.startsWith('luiz-justino:'))

      if (luizPr) {
        reqData.fork_status = 'pr_open'
        reqData.fork_pr_url = luizPr.html_url
        reqData.fork_pr_number = luizPr.number
      } else {
        // Check if there's a merged PR from luiz-justino
        const mergedUrl = `https://api.github.com/repos/senecajs/${repoName}/pulls?state=closed&per_page=10`
        const mergedRes = await Fetch(mergedUrl, {
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })
        const mergedData = await mergedRes.json()
        const mergedPrs = Array.isArray(mergedData) ? mergedData : []
        const mergedLuiz = mergedPrs.find(pr =>
          pr.head && pr.head.label && pr.head.label.startsWith('luiz-justino:') && pr.merged_at
        )
        if (mergedLuiz) {
          reqData.fork_status = 'merged'
          reqData.fork_pr_url = mergedLuiz.html_url
          reqData.fork_pr_number = mergedLuiz.number
        } else {
          reqData.fork_status = 'not_started'
          reqData.fork_pr_url = null
          reqData.fork_pr_number = null
        }
      }
    } catch (e) {
      reqData.open_prs = 0
      reqData.fork_status = 'not_started'
      reqData.fork_pr_url = null
    }


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