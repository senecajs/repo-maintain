const Chalk = require('chalk') // colours for console.log
const Fetch = require('node-fetch') // node fetch api
const Fs = require('fs-extra') // for interacting with the file system

const Plugins = require('../data/json/plugins.json') // handpicked list of plugins
const checkList = require('../design/checks/checks.js') // extensible list for checks == Object


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
        // console.log(checkList)
        // const individCheck
        // const fileExistChecks = checkList.filter(check => check.kind == "file_exist")
        // console.log(fileExistChecks)

        for(checkName in checkList) {
            
            let checkDetails = checkList[checkName]
            if (checkDetails.kind != "file_exist") {
                continue
            }
            let file = checkDetails.file
        
            // URL is valid even if master branch is named "main"
            let url = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/" + file

            const fileRaw = await Fetch(url)
            let fileOK = fileRaw.ok

            // if 404, download nothing and pass to next file
            if (false == fileOK) {
                console.log(Chalk.red(file), "File not found.")
                continue
            }

            // download file text otherwise
            let fileContent = await fileRaw.text()
            Fs.writeFileSync('../data/downloads/'+orgRepo+'/'+file, fileContent)
            console.log(file,"File created.")
        }
    }
}

// if required, find doDownloadResults function in github commits

doDownloadPlugins()