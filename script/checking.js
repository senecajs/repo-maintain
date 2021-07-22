// function-related constants
const Chalk = require('chalk') // for custom colours when logging to console
const Fs = require('fs') // access the file system
const Filehound = require('filehound') // better management of files and directories
const Path = require('path') // for file and folder paths
const jsonFile = require('jsonfile') // easily handle JSON files
const _ = require('underscore') // for filtering of data

// file-related constants
const checkList = require('../design/checks/checks.js')
const error404 = Fs.readFileSync('../data/txt/404.txt')

// function-related constants
const checkOps = checkOperations()
//------------------------------------------------------------------


// this creates a promise object
const plugins = Filehound.create()
    .path('../data/downloads')
    .directory()
    .find();

async function runChecks() {
    const pluginList = await plugins
    for (let i = 0; i < pluginList.length; i++) {
        let plugin =  pluginList[i]
        
        results = []

        const pluginRelPath = Path.basename(plugin)
        const orgRepo = pluginRelPath.replace('__','/')
        console.log("\n\n",Chalk.blue(orgRepo))

        // for each check in the list of checks to do:
        for(checkName in checkList) {
            let checkDetails = checkList[checkName]
            checkDetails.name = checkName

            // if check taken from checks.js does not exist in checkOperations,
            // print error message and proceed to next check in list
            let checkKind = checkOps[checkDetails.kind]
            if(null == checkKind) {
                console.log('WARNING', 'Check does not exist', checkName, checkDetails.kind)
                continue
            }

            let res = await checkKind(checkDetails, pluginRelPath)
            console.log(Chalk.cyan("\nCheck:"),res)
            results.push(res)
        }
    }
}

async function run() {
    console.log(Chalk.bold("\nAll Checks:"))
    let checkResults = await runChecks()
    console.log(Chalk.bold("\nChecks complete.\n"))
}

function checkOperations() {
    return {
        file_exist: async function(checkDetails, pluginRelPath) {

            let file = checkDetails.file
            let filePath = '../data/downloads/'+pluginRelPath+'/'+file
            const fileContent = Fs.readFileSync(filePath)
            if (error404 == fileContent) {
                var status = false
                var status_code = "404 File not found"
            } else {
                var status = true
                var status_code = "200 File exists"
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: checkDetails.file,
              pass: status,
              why: status_code,
            }
        },

        content_contain: async function(checkDetails, pluginRelPath) {
            let file = checkDetails.file
            let searchContent = checkDetails.contains
            let filePath = '../data/downloads/'+pluginRelPath+'/'+file
            const fileContent = Fs.readFileSync(filePath)
            if (fileContent.includes(searchContent)) {
                var status = true
                var status_code = "200 Search string found."
            } else {
                var status = false
                var status_code = "404 Search string cannot be found"
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: checkDetails.file,
              pass: status,
              why: status_code,
            }
        },
    }
}

run()

/**
 * TASK ORDER
 * 
 * For each directory of downloaded files (named for plugin):
 *      For each check in checks.js:
 *          Read "kind", run associated task in makeCheckFuncs function
 *          Return result of task and write to object
 *      Proceed to next task
 * Proceed to next repo.
 * 
 */


