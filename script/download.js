const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const Clear = require('clear-dir')
const Plugins = require('../data/json/plugins.json')

async function doDownload() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    // console.log(objKeys)
    for (let i = 0; i < objKeys.length; i++) {

        
        let readmeURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/README.md"
        let packageURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/package.json"

        // make sure directory exists and if so, clear it
        Fs.emptyDirSync('../data/downloads/'+objKeys[i])
        console.log("Previous", objKeys[i], "directory cleared.")
        

        const readmeRaw = await Fetch(readmeURL)
        const readme = await readmeRaw.text()
        Fs.writeFileSync('../data/downloads/'+objKeys[i]+'/README.md', readme)
        console.log("README.md created.")

        const packageRaw = await Fetch(packageURL)
        const packageText = await packageRaw.text()
        const package = JSON.stringify(packageText)
        Fs.writeFileSync('../data/downloads/'+objKeys[i]+'/package.json', package)
        console.log("package.json created.")
    }
    

    
}

doDownload()