const Fetch = require('node-fetch')
const Fs = require('fs')
const Plugins = require('../data/json/plugins.json')

async function doDownload() {
    console.log("Download function initiated.")

    console.log(Plugins)
    objKeys = Object.keys(Plugins)
    console.log(objKeys)
    

    // let readmeURL = "https://raw.githubusercontent.com/enecajs/seneca-transport/master/README.md"
    // let readmeURL = "https://raw.githubusercontent.com/" + orgRepo + "/master/README.md"
    // let packageURL = "https://raw.githubusercontent.com/" + orgRepo + "/master/package.json"

    // const readmeRaw = await Fetch(readmeURL)
    // const readme = await readmeRaw.text()
    // console.log(readme)

    // const packageRaw = await Fetch(packageURL)
    // const packageText = await packageRaw.text()
    // const package = JSON.parse(packageText)
    // console.log(package)
}

doDownload()