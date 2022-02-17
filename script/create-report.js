module.exports = {
  createReport: async function (results) {
    // Node modules
    const Fs = require('fs')

    console.log('\nCreating report...\n')

    run()
    async function run() {
      let headings = await genHeadings()
      let data = await genData(headings, results)
      let createReport = await genReport(headings, data.md)
      let createCSV = await genCSV(headings, data.csv)

      Fs.writeFileSync('./REPORT.md', createReport)
      Fs.writeFileSync('./REPORT.csv', createCSV)
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
      dataSetCSV = []
      let npm = 'https://www.npmjs.com/package/'
      let github = 'https://github.com/'
      for (plugin in results) {
        let pluginReport = {}
        let reportCSV = {}
        let pluginData = results[plugin].data
        let checkResults = results[plugin].checks
        let npmURL = npm + pluginData.package_name
        let githubURL = github + pluginData.full_name

        pluginReport.package =
          '[' + pluginData.package_name + '](' + npmURL + ')'
        reportCSV.package =
          '"=HYPERLINK(""' + npmURL + '"",""' + pluginData.package_name + '"")"'

        pluginReport.PASS = 'pass'
        reportCSV.PASS = 'pass'

        pluginReport.full_name =
          '[' + pluginData.full_name + '](' + githubURL + ')'
        reportCSV.full_name =
          '"=HYPERLINK(""' + githubURL + '"",""' + pluginData.full_name + '"")"'

        pluginReport.fails = ''
        reportCSV.fails = ''

        for (check in checkResults) {
          checkDetails = checkResults[check]
          if (false == checkDetails.pass) {
            pluginReport.fails += '[' + check + '] '
            reportCSV.fails += '[' + check + '] '

            pluginReport.PASS = 'FAIL'
            reportCSV.PASS = 'FAIL'
          }
        }

        for (let i = 4; i < headings.length; i++) {
          let title = headings[i]
          pluginReport[title] = pluginData[title]
          reportCSV[title] = pluginData[title]
        }
        let pluginReportValues = Object.values(pluginReport)
        let csvValues = Object.values(reportCSV)
        dataSet.push(pluginReportValues)
        dataSetCSV.push(csvValues)
      }
      return {
        md: dataSet,
        csv: dataSetCSV,
      }
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

    async function genCSV(headings, data) {
      let csvArray = []

      let head = headings.join(',')
      csvArray.push(head)

      for (let j = 0; j < data.length; j++) {
        let plugin = data[j]
        let formatted = plugin.join(',')
        csvArray.push(formatted)
      }

      let CSVreport = csvArray.join('\n')
      return CSVreport
    }
  },
}
