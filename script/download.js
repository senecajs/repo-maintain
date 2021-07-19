const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const Plugins = require('../data/json/plugins.json')
const Results = require('../data/json/results.json')


async function doDownloadPlugins() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    // console.log(objKeys)
    for (let i = 0; i < objKeys.length; i++) {

        // change / to __ in objKeys[i]
        const orgRepo = objKeys[i].replace('/','__')

        // below URLs are valid even if master branch is named "main"
        // become function in future
        let readmeURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/README.md"
        let packageURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/package.json"

        // make sure directory exists and if so, clear it
        // BY HAND !!

        // wait to new directory creation, and write files to that
        const createDir = await Fs.ensureDir('../data/downloads/'+orgRepo)
        console.log(Chalk.cyan(objKeys[i]))

        const readmeRaw = await Fetch(readmeURL)
        let readme = await readmeRaw.text()
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/README.md', readme)
        console.log("README.md created.")

        const packageRaw = await Fetch(packageURL)
        let package = await packageRaw.text()
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/package.json', package)
        console.log("package.json created.")
    }
}

// if required, find doDownloadResults function in github commits

doDownloadPlugins()