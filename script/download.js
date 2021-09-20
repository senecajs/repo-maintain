const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const getCode = require('get-github-code')

const Plugins = require('../data/json/plugins.json')
const checkList = require('../design/checks/checks.js')


async function doDownloadPlugins() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    for (let i = 0; i < objKeys.length; i++) {

        // namespacing
        const orgRepo = objKeys[i].replace('/','__')

        // wait for new directory creation before proceeding
        const createDir = await Fs.ensureDir('../data/downloads/'+orgRepo)
        let dest = '../data/downloads/'+orgRepo
        console.log(Chalk.cyan(objKeys[i]))

    
        // URL is valid even if master branch is named "main"
        let url = "https://github.com/" + objKeys[i]
        let repoCode = await getCode(url, {output:dest})
    }
}

doDownloadPlugins()