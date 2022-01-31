const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const getCode = require('github-download')

const Plugins = require('../data/json/filter.json')
const checkList = require('../design/checks/checks.js')

async function doDownloadPlugins() {
  console.log('Download function initiated.')

  let totalScanned = 0
  for (let i = 0; i < Plugins.length; i++) {
    // namespacing
    const orgRepo = Plugins[i].full_name.replace('/', '__')

    // wait for new directory creation before proceeding
    const createDir = await Fs.ensureDir('./data/downloads/' + orgRepo)
    console.log(Chalk.cyan(Plugins[i].full_name))

    for (checkName in checkList) {
      let checkDetails = checkList[checkName]
      if (checkDetails.kind != 'file_exist') {
        continue
      }
      let file = checkDetails.file

      // URL is valid even if master branch is named "main"
      let url =
        'https://raw.githubusercontent.com/' +
        Plugins[i].full_name +
        '/master/' +
        file

      const fileRaw = await Fetch(url)
      let fileOK = fileRaw.ok

      if (false == fileOK) {
        console.log(Chalk.red(file), 'File not found.')
        continue
      }

      let fileContent = await fileRaw.text()
      Fs.writeFileSync('./data/downloads/' + orgRepo + '/' + file, fileContent)
      console.log(file, 'File created.')
    }
    totalScanned++
  }
  console.log('TOTAL ASSUMED : ', Plugins.length)
  console.log('TOTAL ACTUAL : ', totalScanned)
}

doDownloadPlugins()
