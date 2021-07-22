const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const _ = require('underscore')

const Plugins = require('../data/json/plugins.json')
const Results = require('../data/json/results.json')
const checkList = require('../design/checks/checks.js')

const error404 = Fs.readFileSync('../data/txt/404.txt')


async function doDownloadPlugins() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    // console.log(objKeys)
    for (let i = 0; i < objKeys.length; i++) {

        // change / to __ in objKeys[i]
        const orgRepo = objKeys[i].replace('/','__')

        // wait for new directory creation before proceeding
        const createDir = await Fs.ensureDir('../data/downloads/'+orgRepo)
        console.log(Chalk.cyan(objKeys[i]))

        const fileExistChecks = _.where(checkList, {kind: "file_exist"})
        for(checkName in fileExistChecks) {
            let checkDetails = fileExistChecks[checkName]
            let file = checkDetails.file
        
            // below URLs are valid even if master branch is named "main"
            let url = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/" + file

            const fileRaw = await Fetch(url)
            let fileOK = fileRaw.ok
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