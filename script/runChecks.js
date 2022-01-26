// function-related constants
const Chalk = require('chalk')
const Fs = require('fs')
const Filehound = require('filehound')
const Path = require('path') 
const jsonFile = require('jsonfile')
const Hoek = require('@hapi/hoek')
// hrm this is throwing an error
const gitDefault = require('default-branch')

// file-related constants
const checkList = require('../design/checks/checks.js')

// function-related constants
const checkOps = checkOperations()

const argString = process.argv.slice(2)
if (null == argString[0]) {
    throw new Error("Configuration must be specified. See README.md for details.")
}
const argArray = argString[0].split(',')
//---------------------------------------------------------------

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
        // console.log("\n\n",Chalk.blue(orgRepo))

        // JSON files
        const jsonPromise = Filehound.create()
            .paths('../data/downloads/'+pluginRelPath)
            .ext('json')
            .find();
        const jsonFiles = await jsonPromise

        // non-JSON files
        const stringPromise = Filehound.create()
            .paths('../data/downloads/'+pluginRelPath)
            .ext('json')
            .not()
            .find();
        const stringFiles = await stringPromise

        dataForChecks = {}
        dataForChecks.pluginPath = pluginRelPath
        dataForChecks.orgRepo = orgRepo

        for (let j = 0; j < jsonFiles.length; j++) {
            let filePath = jsonFiles[j]

            let fileName = Path.basename(filePath)
            let fileContent = require(filePath)

            dataForChecks[fileName] = fileContent

            //to get package name from package.json file
            if ("package.json" == fileName) {
                dataForChecks.packageName = fileContent.name
                // can't use this, contrib don't all have valid URLs in their package.json files
                // dataForChecks.repoURL = fileContent.repository.url
                // console.log(dataForChecks.repoURL)
            }
        }

        for (let s = 0; s < stringFiles.length; s++) {
            let filePath = stringFiles[s]

            let fileName = Path.basename(filePath)
            let fileContent = Fs.readFileSync(filePath)

            dataForChecks[fileName] = fileContent
        }

        // Filter checks object to configs
        const relCheckList = {}
        for (const checkName in checkList) {
            let checkDetails = checkList[checkName]
            if (argArray.includes(checkDetails.config)){
                relCheckList[checkName] = checkDetails
            }
        }
        
        for(const checkName in relCheckList) {
            let checkDetails = checkList[checkName]
            checkDetails.name = checkName

            // make sure operation of function is detailed below
            let checkKind = checkOps[checkDetails.kind]
            if(null == checkKind) {
                console.log('WARNING', 'Check does not exist', checkName, checkDetails.kind)
                continue
            }

            let res = await checkKind(checkDetails, dataForChecks)
            results[checkName] = res
            
        }

        let nameOfObj = orgRepo+"##"+dataForChecks.packageName
        allChecks[nameOfObj] = results
    }
    Fs.writeFileSync('../data/json/allChecks.json', JSON.stringify(allChecks))
}

// --------------------------------------------------------------------
async function run() {
    console.log("Running checks...")
    let checkResults = await runChecks()
    console.log("Checks complete. Run createReport.js to generate Markdown table of results.")
}
// --------------------------------------------------------------------

function checkOperations() {

    return {
        file_exist: async function(checkDetails, dataForChecks) {
            let file = checkDetails.file
            let path = dataForChecks.pluginPath
            let pass = Fs.existsSync('../data/downloads/'+path+'/'+file)
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

        fileX_exist_if_contain_json: async function(checkDetails,dataForChecks) {
        
            let file = checkDetails.file
            let ifFile = checkDetails.if_file
            let path = dataForChecks.pluginPath
            let pass = Fs.existsSync('../data/downloads/'+path+'/'+ifFile)
            let why = "json_file_not_found"
            let searchContent = checkDetails.contains
            let searchIsNot = checkDetails.contains_is_not
            let containsType = checkDetails.contains_type
            let config = checkDetails.config

            if (true == pass) {
                const ifFilePath = '../data/downloads/'+path+'/'+ifFile
                const ifFileContent = Fs.readFileSync(ifFilePath)
                if ("key" == containsType) {
                    // let chain = []
                    // for (let i = 0; i < searchContent.length; i++) {
                    //     chain.push(searchContent[i])
                    // }
                    var searchIs = Hoek.reach(ifFileContent,searchContent)
                    pass = (null != searchIs && searchIsNot != searchIs)

                }
                else { // add in "else if" clause if searching for json value
                    console.log("Content type not recognised. fileXjson")
                    pass = false
                }

                if (true == pass) {
                    if ("js" == config) {
                        file = searchIs
                        pass = file in dataForChecks
                    }
                    if ("ts" == config) {
                        file = Path.basename(searchIs,'.js')+'.ts'
                        pass = file in dataForChecks
                    }

                    if (true == pass) {
                    why = "file_found"
                    }
                    else {
                        why = "file_not_found"
                    }
                }
                else {
                    why = "illegal_value"
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

        content_contain_string: async function(checkDetails, dataForChecks) {

            let file = checkDetails.file
            let path = dataForChecks.pluginPath
            let pass = Fs.existsSync('../data/downloads/'+path+'/'+file)
            let searchContent = checkDetails.contains
            let why = "file_not_found"

            if (true == pass) {
                const filePath = '../data/downloads/'+path+'/'+file
                const fileContent = Fs.readFileSync(filePath)
                for (let i = 0; i < searchContent.length; i++) {
                    pass = fileContent.includes(searchContent[i])
                }
                
                if (true == pass) {
                    why = "found"
                }
                else {
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

        content_contain_json: async function(checkDetails, dataForChecks) {

            let file = checkDetails.file
            let path = dataForChecks.pluginPath
            let pass = Fs.existsSync('../data/downloads/'+path+'/'+file)
            let searchContent = checkDetails.contains
            let contentType = checkDetails.contains_type
            // let searchLevels = Object.values(searchContent)
            let why = "file_not_found"

            if (true == pass) {
                const filePath = '../data/downloads/'+path+'/'+file
                const fileContent = require(filePath)
                if ("key" == contentType) {
                    let chain = []
                    for (let i = 0; i < searchContent.length; i++) {
                        chain.push(searchContent[i])
                    }
                    pass = (null != (Hoek.reach(fileContent,chain)))
                    // console.log(pass)

                    // add in else if clause for if searching for json value
                }
                else {
                    console.log("Content type not recognised. content json")
                    pass = false
                }
                
                if (true == pass) {
                    why = "found"
                }
                else {
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

        check_branch: async function(checkDetails,dataForChecks) {
            let branch = checkDetails.branch
            let branchCorrect = checkDetails.branch_is

            if ("default" == branch) {
                branch = await gitDefault("https://github.com/"+dataForChecks.orgRepo)
            }
            let pass = (null != branch)
            let why = "branch_not_found"

            if (true == pass){
                if (branchCorrect == branch) {
                    why = "branch_correct"
                }
                else {
                    pass = false
                    why = "branch_incorrect"
                }
            }

            return {
              check: checkDetails.name,
              kind: checkDetails.kind,
              file: 'N/A',
              pass: pass,
              why: why,
            }
        },

    }
}

// --------------------------------------------------------------------
run()
// --------------------------------------------------------------------
