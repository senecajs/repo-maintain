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
        
        // use regexp to match any README version (uppercase, lowercase, mix of both)
        // would this even work?? 
        // let readmeREGEX = foo
        // add readmeREGEX into url string

        // below URLs are valid even if master branch is named "main"
        // become function in future
        let readmeURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/README.md"
        let packageURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/package.json"

        // make sure directory exists and if so, clear it
        // BY HAND !!

        const readmeRaw = await Fetch(readmeURL)
        // check for 200 status before proceeding
        let readme = await readmeRaw.text()
        // re-fetch using readme.md instead of README.md if latter returns 404 error
        // if ("404: Not Found" == readme) {
        //     let newURL = "https://raw.githubusercontent.com/" + objKeys[i] + "/master/readme.md"
        //     const newRaw = await Fetch(newURL)
        //     readme = await newRaw.text()
        // }
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/README.md', readme)
        console.log("README.md created.")

        const packageRaw = await Fetch(packageURL)
        const package = await packageRaw.text()
        // just stringifying a string
        // const package = JSON.stringify(packageText)
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/package.json', package)
        console.log("package.json created.")
    }
    
}


// Download pausing around loop 500-700, use console log to periodically find status of running script?
async function doDownloadResults() {
    console.log("Download function initiated for results.json.")

    const json = await Fs.readJson('../data/json/results.json')

    for (let i = 0; i < 700; i++) {

        let repo = json[i]
        // change / to _ in json[i]
        const orgRepo = repo.full_name.replace('/','_')
        
        // below URLs are valid even if master branch is named "main"
        let readmeURL = "https://raw.githubusercontent.com/" + repo.full_name + "/master/README.md"
        let packageURL = "https://raw.githubusercontent.com/" + repo.full_name + "/master/package.json"

        // make sure directory exists and if so, clear it
        Fs.emptyDirSync('../data/downloads/'+orgRepo)
        console.log("[",i,"] Previous", orgRepo, "directory cleared.")
        

        const readmeRaw = await Fetch(readmeURL)
        let readme = await readmeRaw.text()
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/README.md', readme)
        console.log("README.md created.")

        const packageRaw = await Fetch(packageURL)
        const packageText = await packageRaw.text()
        const package = JSON.stringify(packageText)
        Fs.writeFileSync('../data/downloads/'+orgRepo+'/package.json', package)
        console.log("package.json created.")
    }
    console.log("Downloads complete.")
}


doDownloadPlugins()