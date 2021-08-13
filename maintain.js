// function-related constants
const Chalk = require('chalk') // for custom colours when logging to console
const Fs = require('fs') // access the file system
const Filehound = require('filehound') // better management of files and directories
const Path = require('path') // for file and folder paths
const jsonFile = require('jsonfile') // easily handle JSON files
const Hoek = require('@hapi/hoek') // for object to reference conversions

// file-related constants
const checkList = require('./design/checks/checks.js') // extensible format for plugin checks

// function-related constants
// const checkOps = checkOperations()


class Maintain {
    run() {
        console.log('running :)')
        // code to run checks on single plugin in same dir goes here
        let pkg = require(process.cwd()+'/package.json')
        // console.log(pkg)

        // const Chalk = require('chalk')
        console.log(Chalk.red("rededemption"))
        let lines = require('./data/json/plugins.json')
        // console.log(lines)
        //-------------------------------------------

        async function runChecks() {
            // reading client's files in
            const jsonPromise = Filehound.create()
                .paths(process.cwd())
                .discard('node_modules')
                .ext('json')
                .find();
            const jsonFiles = await jsonPromise
            console.log(jsonFiles)

            // non-JSON files
            const stringPromise = Filehound.create()
                .paths(process.cwd())
                .discard('node_modules')
                .discard('.json')
                .find();
            const stringFiles = await stringPromise
            console.log(stringFiles)
        }
        runChecks()
    }
}

// TODO printing undefined ?
module.exports = {
    Maintain
}