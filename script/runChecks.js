// function-related constants
const Chalk = require('chalk') // for custom colours when logging to console
const Fs = require('fs') // access the file system
const Filehound = require('filehound') // better management of files and directories
const Path = require('path') // for file and folder paths
const jsonFile = require('jsonfile') // easily handle JSON files

// file-related constants
const checkList = require('../design/checks/checks.js') // extensible format for plugin checks

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
    allChecks = {}
    for (let i = 0; i < pluginList.length; i++) {
        let plugin =  pluginList[i]
        
        results = {}
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

            // read all files in here

            // run each of the checks for each plugin print to console
            // checkData = object to call (contains all other necessary data)
            // let res = await checkKind(checkData)
            let res = await checkKind(checkDetails, pluginRelPath)
            // console.log(Chalk.cyan("\nCheck:"),res)
            results[checkName] = res
            
            // output
        }

        // this is where the lookup key needs to be defined (as name of plugin)
        allChecks[orgRepo] = results
    }
    Fs.writeFileSync('../data/json/allChecks.json', JSON.stringify(allChecks))
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
        // file_exist is a lookup key (= unique name of each element in object)
        file_exist: async function(checkDetails, pluginRelPath) {
            let file = checkDetails.file
            let pass = Fs.existsSync('../data/downloads/'+pluginRelPath+'/'+file)
            let why = "not_found"
            if (true == pass){
                why = "found"
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: file,
              pass: pass,
              why: why,
            }
        },

        content_contain_string: async function(checkDetails, pluginRelPath) {

            let file = checkDetails.file
            let pass = Fs.existsSync('../data/downloads/'+pluginRelPath+'/'+file)
            let searchContent = checkDetails.contains
            let why = "file_not_found"

            if (true == pass) {
                const filePath = '../data/downloads/'+pluginRelPath+'/'+file
                const fileContent = Fs.readFileSync(filePath)
                pass = fileContent.includes(searchContent)
                
                if (true == pass) {
                    why = "found"
                } else {
                    why = "not_found"
                }
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: file,
              pass: pass,
              why: why,
            }
        },

        content_contain_json: async function(checkDetails, pluginRelPath) {

            let file = checkDetails.file
            let pass = Fs.existsSync('../data/downloads/'+pluginRelPath+'/'+file)
            let searchContent = checkDetails.contains
            let contentType = checkDetails.content_type
            let searchLevels = Object.values(searchContent)
            let why = "file_not_found"

            if (true == pass) {
                const filePath = '../data/downloads/'+pluginRelPath+'/'+file
                const fileContent = require(filePath)
                if ("key" == contentType) {
                    // console.log(searchLevels)
                    // console.log(searchLevels[0])
                    // console.log(fileContent.scripts.test)

                    let currentLevel = fileContent

                    // if (searchLevels.length > 1) {
                    //     for (let i = 0; i < searchLevels.length; i++) {
                    //         currentLevel =+ "."+searchLevels[i]
                    //         console.log(currentLevel)
                    //     }
                    // }
                    pass = fileContent.scripts.hasOwnProperty(searchLevels[1])
                    // console.log(pass)

                    // let currentLevel = fileContent
                    // let currentSearch = "placeholder"
                    // for (let i = 0; i <= searchLevels.length - 1; i++) {
                    //     if (1 == searchLevels.length) {
                    //         currentSearch = searchLevels[i]
                    //     } else {
                    //         currentLevel += "."+searchLevels[i]
                    //         console.log(currentLevel)
                    //         currentSearch = searchLevels[i+1]
                    //         console.log(currentSearch)
                    //     }
                    // }
                    // pass = currentLevel.hasOwnProperty(currentSearch)
                    // console.log(pass)
                    // add in else if clause for json value
                } else {
                    console.log("Content type not recognised.")
                    pass = false
                }
                
                if (true == pass) {
                    why = "found"
                } else {
                    why = "not_found"
                }
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: file,
              pass: pass,
              why: why,
            }
        },

    }
}

// --------------------------------------------------------------------
run()
// --------------------------------------------------------------------
