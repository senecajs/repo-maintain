// function-related constants
const Chalk = require('chalk')
const Fs = require('fs')
const Filehound = require('filehound')
const Path = require('path') 
const jsonFile = require('jsonfile')
const Hoek = require('@hapi/hoek')

// file-related constants
const checkList = require('../design/checks/checks.js')

// function-related constants
const checkOps = checkOperations()

const argString = process.argv.slice(2)
const argArray = argString[0].split(',')
console.log(argArray)
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

        for (let j = 0; j < jsonFiles.length; j++) {
            let filePath = jsonFiles[j]

            let fileName = Path.basename(filePath)
            let fileContent = require(filePath)

            dataForChecks[fileName] = fileContent

            //to get package name from package.json file
            if ("package.json" == fileName) {
                dataForChecks.packageName = fileContent.name
                // console.log(dataForChecks.packageName)
            }
        }

        for (let s = 0; s < stringFiles.length; s++) {
            let filePath = stringFiles[s]

            let fileName = Path.basename(filePath)
            let fileContent = Fs.readFileSync(filePath)

            dataForChecks[fileName] = fileContent
        }

        for(checkName in checkList) {
            let checkDetails = checkList[checkName]
            checkDetails.name = checkName

            // make sure operation of function is detailed below
            let checkKind = checkOps[checkDetails.kind]
            if(null == checkKind) {
                console.log('WARNING', 'Check does not exist', checkName, checkDetails.kind)
                continue
            }

            let res = await checkKind(checkDetails, pluginRelPath)
            results[checkName] = res
            
        }

        let nameOfObj = orgRepo+"##"+dataForChecks.packageName
        allChecks[nameOfObj] = results
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

function checkOperations() {

    return {
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
                for (let i = 0; i < searchContent.length; i++) {
                    pass = fileContent.includes(searchContent[i])
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

        content_contain_json: async function(checkDetails, pluginRelPath) {

            let file = checkDetails.file
            let pass = Fs.existsSync('../data/downloads/'+pluginRelPath+'/'+file)
            let searchContent = checkDetails.contains
            let contentType = checkDetails.content_type
            // let searchLevels = Object.values(searchContent)
            let why = "file_not_found"

            if (true == pass) {
                const filePath = '../data/downloads/'+pluginRelPath+'/'+file
                const fileContent = require(filePath)
                if ("key" == contentType) {
                    let chain = []
                    for (let i = 0; i < searchContent.length; i++) {
                        chain.push(searchContent[i])
                    }
                    pass = (null != (Hoek.reach(fileContent,chain)))
                    // console.log(pass)

                    // add in else if clause for if searching for json value
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
