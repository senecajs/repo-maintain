const Chalk = require('chalk')
const Fetch = require('node-fetch')
const Fs = require('fs-extra')
const getCode = require('github-download')

const Plugins = require('../data/json/plugins.json')
const checkList = require('../design/checks/checks.js')


async function doDownloadPlugins() {
    console.log("Download function initiated.")

    objKeys = Object.keys(Plugins)
    for (let i = 0; i < objKeys.length; i++) {

        // namespacing
        const orgRepo = objKeys[i].replace('/','__')
        console.log(objKeys[i]) // with single forward slash
        console.log(orgRepo) // with double underscore

        // wait for new directory creation before proceeding
        let dir = '../data/downloads/'+orgRepo
        const createDir = await Fs.ensureDir(dir)
        
        // let params = "https://github.com"+objKeys[i]+".git"
        // console.log(Chalk.cyan(objKeys[i]))

        // getCode(params,dir)
        // .on('dir', function(dir) {
        //     console.log(dir)
        // })
        // .on('file', function(file) {
        //     console.log(file)
        // })
        // .on('zip', function(zipUrl) { //only emitted if Github API limit is reached and the zip file is downloaded
        //     console.log(zipUrl)
        // })
        // .on('error', function(err) {
        //     console.error(err)
        // })
        // .on('end', function() {
        //     exec('tree', function(err, stdout, sderr) {
        //         console.log(stdout)
        //     })
        // })
    }
}

doDownloadPlugins()