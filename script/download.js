const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')

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
        console.log(Chalk.cyan(objKeys[i]))

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

            if (false == fileOK) {
                console.log(Chalk.red(file), "File not found.")
                continue
            }

            let fileContent = await fileRaw.text()
            Fs.writeFileSync('../data/downloads/'+orgRepo+'/'+file, fileContent)
            console.log(file,"File created.")
        }
    }
}

doDownloadPlugins()