// function-related constants
const Chalk = require('chalk') // for custom colours when logging to console
const Fs = require('fs') // access the file system
const Filehound = require('filehound') // better management of files and directories
const Path = require('path') // for file and folder paths
const jsonFile = require('jsonfile') // easily handle JSON files
const Hoek = require('@hapi/hoek') // for object to reference conversions

// file-related constants
const checkList = require('./design/checks/checks.js') // extensible format for plugin checks



class Maintain {
    run() {
        // console.log('running :)')
        // code to run checks on single plugin in same dir goes here
        // let pkg = require(process.cwd()+'/package.json')
        // console.log(pkg)

        // const Chalk = require('chalk')
        // console.log(Chalk.red("rededemption"))
        // let lines = require('./data/json/plugins.json')
        // console.log(lines)
        //-------------------------------------------
        
        const checkOps = checkOperations()

        async function runChecks() {
            let results = {}

            // reading client's files in
            const jsonPromise = Filehound.create()
                .paths(process.cwd())
                .discard('node_modules')
                .ext('json')
                .find();
            const jsonFiles = await jsonPromise
            // console.log(jsonFiles)

            // non-JSON files
            const stringPromise = Filehound.create()
                .paths(process.cwd())
                .discard('node_modules')
                .discard('.json')
                .find();
            const stringFiles = await stringPromise
            // console.log(stringFiles)

            let dataForChecks = {}

            for (let j = 0; j < jsonFiles.length; j++) {
                let filePath = jsonFiles[j]
    
                // const fileExt = Path.extname(filePath)
                // const fileName = Path.basename(filePath, fileExt)
                let fileName = Path.basename(filePath)
                let fileContent = require(filePath)
    
                dataForChecks[fileName] = fileContent
                // console.log(Chalk.yellow("\n\n"+fileName))
                // console.log(fileContent)
    
                //to get package name from package.json file
                if ("package.json" == fileName) {
                    dataForChecks.packageName = fileContent.name
                    // console.log(dataForChecks.packageName)
                }
            }
    
            for (let s = 0; s < stringFiles.length; s++) {
                let filePath = stringFiles[s]
    
                // const fileExt = Path.extname(filePath)
                // const fileName = Path.basename(filePath, fileExt)
                let fileName = Path.basename(filePath)
                let fileContent = Fs.readFileSync(filePath)
    
                dataForChecks[fileName] = fileContent
                // console.log(Chalk.cyan("\n\n"+fileName))
                // console.log(fileContent)
            }

            let fileNameos = Object.keys(dataForChecks)
            // console.log(fileNameos)

            for(const checkName in checkList) {
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
                // checkData = object to call (contains all other necessary data)
                // let res = await checkKind(checkData)
                let res = await checkKind(checkDetails)
                // console.log(Chalk.cyan("\nCheck:"),res)
                results[checkName] = res
                
                // output
            }   
            
            return results

        } // end of runChecks()

        async function conclusion(checkResults) {
            let totalNb = 0
            let failNb = 0
            let fails = []
            for (const check in checkResults) {
                totalNb++
                let checkDetails = checkResults[check]
                checkDetails.name = check
                if (false == checkDetails.pass) {
                    failNb++
                    fails.push(checkDetails.check)
                }
            }
            let failMsg = "Failed checks: "+failNb
            let totalMsg = "Total checks: "+totalNb
            let message = `${totalMsg}\n${failMsg}\n${fails}`
            return message
        }

        // --------------------------------------------------------------------
        async function runAll() {
            console.log("Running checks on your plugin...")
            let checkResults = await runChecks() // "undefined" printing here before anything else
            console.log("Process complete.")
            let checkConc = await conclusion(checkResults)
            console.log(checkConc)
        }
        // --------------------------------------------------------------------

        function checkOperations() {

            return {
                // file_exist is a lookup key (= unique name of each element in object)
                file_exist: async function(checkDetails) {
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
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
        
                content_contain_string: async function(checkDetails) {
        
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
                    let searchContent = checkDetails.contains
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const filePath = './'+file
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
        
                content_contain_json: async function(checkDetails) {
        
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
                    let searchContent = checkDetails.contains
                    let contentType = checkDetails.content_type
                    // let searchLevels = Object.values(searchContent)
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const filePath = './'+file
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
        } // end of checkOperations()
        
        // -------------------
        runAll()
        // -------------------
    }
}

// TODO printing undefined ?
module.exports = {
    Maintain
}