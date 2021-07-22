// function-related constants
const Chalk = require('chalk') // for custom colours when logging to console
const Fs = require('fs') // access the file system
const Filehound = require('filehound') // better management of files and directories
const Path = require('path') // for file and folder paths
const jsonFile = require('jsonfile') // easily handle JSON files
const _ = require('underscore') // for filtering of data

// file-related constants
const checkList = require('../design/checks/checks.js') // extensible format for plugin checks
const error404 = Fs.readFileSync('../data/txt/404.txt') // file not found custom error message

// function-related constants
const checkOps = checkOperations()
//---------------------------------------------------------------
/**
 * ORDER OF OPERATIONS
 * 
 * run() => runChecks() => checkOperations()
 *                          ^
 *                          this is run for every check, for every plugin
 */


// this creates a promise object
const plugins = Filehound.create()
    .path('../data/downloads')
    .directory()
    .find();

// main function
async function runChecks() {
    const pluginList = await plugins
    for (let i = 0; i < pluginList.length; i++) {
        let plugin =  pluginList[i]
        
        results = []
        // relative path towards downloaded files - plugin specific
        const pluginRelPath = Path.basename(plugin)
        const orgRepo = pluginRelPath.replace('__','/')
        console.log("\n\n",Chalk.blue(orgRepo))

        // for each check in the list of checks to do:
        for(checkName in checkList) {
            let checkDetails = checkList[checkName]
            checkDetails.name = checkName

            // make sure operation of function is detailed below
            let checkKind = checkOps[checkDetails.kind]
            if(null == checkKind) {
                console.log('WARNING', 'Check does not exist', checkName, checkDetails.kind)
                // proceed to next check
                continue
            }

            // run each of the checks for each plugin print to console
            let res = await checkKind(checkDetails, pluginRelPath)
            console.log(Chalk.cyan("\nCheck:"),res)
            results.push(res)
        }
    }
}

// --------------------------------------------------------------------
async function run() {
    console.log(Chalk.bold("\nAll Checks:"))
    let checkResults = await runChecks()
    console.log(Chalk.bold("\nChecks complete.\n"))
}
// --------------------------------------------------------------------

// what to do for each check is detailed here
function checkOperations() {
    return {
        file_exist: async function(checkDetails, pluginRelPath) {

            let file = checkDetails.file
            let filePath = '../data/downloads/'+pluginRelPath+'/'+file
            const fileContent = Fs.readFileSync(filePath)
            // check if "content of file" is just custom 404 error message
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

// --------------------------------------------------------------------
run()
// --------------------------------------------------------------------
