module.exports = {
  createReport: async function (results) {
    // Node modules
    const Fs = require('fs')
    const Path = require('path')

    // External modules
    const Fetch = require('node-fetch')

    console.log('\nCreating report...\n')

    run()
    async function run() {
      let headings = await genHeadings()
      let data = await genData(headings, results)
      let createReport = await genReport(headings, data)

      Fs.writeFileSync('./REPORT.md', createReport)
    }

    async function genHeadings() {
      let headings = [
        'Package',
        'PASS?',
        'orgRepo',
        'Fails',
        'forks_count',
        'stargazers_count',
        'open_issues',
      ]
      return headings
    }

    async function genData(headings, results) {
      dataSet = []
      for (plugin in results) {
        let pluginReport = {}
        let pluginData = results[plugin].data
        let checkResults = results[plugin].checks

        pluginReport.package =
          '[' +
          pluginData.package_name +
          '](https://www.npmjs.com/package/' +
          pluginData.package_name +
          ')'
        pluginReport.PASS = 'pass'
        pluginReport.full_name =
          '[' +
          pluginData.full_name +
          '](https://github.com/' +
          pluginData.full_name +
          ')'

        pluginReport.fails = ''
        for (check in checkResults) {
          checkDetails = checkResults[check]
          if (false == checkDetails.pass) {
            pluginReport.fails += '[' + check + '] '
            pluginReport.PASS = 'FAIL'
          }
        }

        for (let i = 4; i < headings.length; i++) {
          let title = headings[i]
          pluginReport[title] = pluginData[title]
        }
        let pluginReportValues = Object.values(pluginReport)
        dataSet.push(pluginReportValues)
      }
      return dataSet
    }

    async function genReport(headings, data) {
      let reportArray = []

      let head = headings.join('|')
      reportArray.push(head)

      let sepLine = []
      for (let i = 0; i < headings.length; i++) {
        sepLine.push('---')
      }
      let sep = sepLine.join('|')
      reportArray.push(sep)

      for (let j = 0; j < data.length; j++) {
        let plugin = data[j]
        let formatted = plugin.join('|')
        reportArray.push(formatted)
      }

      let report = reportArray.join('\n')
      return report
    }
  },
}
