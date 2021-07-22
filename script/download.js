const Chalk = require('chalk') // colours for console.log
const Fetch = require('node-fetch') // node fetch api
const Fs = require('fs-extra') // for interacting with the file system
const _ = require('underscore') // for dealing with arrays etc

const Plugins = require('../data/json/plugins.json') // handpicked list of plugins
const checkList = require('../design/checks/checks.js') // extensible list for checks

const error404 = Fs.readFileSync('../data/txt/404.txt') // custom error message in the event of file not found


async function doDownloadPlugins() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    for (let i = 0; i < objKeys.length; i++) {

        // change / to __ in objKeys[i]
        const orgRepo = objKeys[i].replace('/','__')

        // wait for new directory creation before proceeding
        const createDir = await Fs.ensureDir('../data/downloads/'+orgRepo)
        console.log(Chalk.cyan(objKeys[i]))

        // only download files needed for "file_exist" checks
        const fileExistChecks = _.where(checkList, {kind: "file_exist"})
        for(checkName in fileExistChecks) {
            let checkDetails = fileExistChecks[checkName]
            let file = checkDetails.file
        
            // URL is valid even if master branch is named "main"
            let url = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/" + file

            const fileRaw = await Fetch(url)
            let fileOK = fileRaw.ok
            // log custom error if file not found
            // error causes: file was never created, non-standard naming convention, etc
            if (false == fileOK) {
                Fs.writeFileSync('../data/downloads/'+orgRepo+'/'+file, error404)
                console.log(Chalk.red(file,"File not found."))
            } else {
                let fileContent = await fileRaw.text()
                Fs.writeFileSync('../data/downloads/'+orgRepo+'/'+file, fileContent)
                console.log(file,"File created.")
            }
        }
    }
}

// if required, find doDownloadResults function in github commits

doDownloadPlugins()