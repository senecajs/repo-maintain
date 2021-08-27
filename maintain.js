// function-related constants
const Chalk = require('chalk')
const Fs = require('fs')
const Filehound = require('filehound')
const Path = require('path')
const jsonFile = require('jsonfile') 
const Hoek = require('@hapi/hoek')

// file-related constants
const checkList = require('./design/checks/checks.js')



class Maintain {
    run() {
        const checkOps = checkOperations()

        const argString = process.argv.slice(2)
        const argArray = argString[0].split(',')
        console.log(argArray)

        async function runChecks() {
            let results = {}
            
            // reading client's JSON files in
            const jsonPromise = Filehound.create()
                .paths(process.cwd())
                .discard(/node_modules/) // This being a regex instead of a string still leads to "undefined" printing
                .ext('json')
                .find();
            const jsonFiles = await jsonPromise // this returns "undefined" at the moment
            
            // non-JSON files
            const stringPromise = Filehound.create()
                .paths(process.cwd())
                .discard(/node_modules/)
                .discard('.json')
                .find();
            const stringFiles = await stringPromise
            
            let dataForChecks = {}
            
            for (let j = 0; j < jsonFiles.length; j++) {
                let filePath = jsonFiles[j]

                let fileName = Path.basename(filePath)
                let fileContent = require(filePath)
    
                dataForChecks[fileName] = fileContent
    
                //to get package and main name from package.json file
                if ("package.json" == fileName) {
                    dataForChecks.packageName = fileContent.name
                    dataForChecks.mainName = fileContent.main
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
                    // proceed to next check
                    continue
                }
                
                let res = await checkKind(checkDetails)
                results[checkName] = res
                
                
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
            let message = `Total checks: ${totalNb}\nFailed checks: ${failNb}\n\t${fails}`
            return message
        }

        // --------------------------------------------------------------------
        async function runAll() {
            console.log("Running checks on your plugin...")
            let checkResults = await runChecks()
            console.log("Process complete.")
            let checkConc = await conclusion(checkResults)
            console.log(checkConc)
        }
        // --------------------------------------------------------------------

        function checkOperations() {

            return {
                file_exist: async function(checkDetails) {
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
                    let why = "file_not_found"
                    if (true == pass){
                        why = "file_found"
                    }
        
                    return {
                      check: checkDetails.name,
                      kind: checkDetails.kind,
                      file: file,
                      pass: pass,
                      why: why,
                    }
                },

                fileX_exist_if_contain_json: async function(checkDetails) {
        
                    console.log(process.cwd())
                    let file = checkDetails.file
                    console.log("FILE:",file)
                    let ifFile = checkDetails.if_file
                    let pass = Fs.existsSync('./'+ifFile)
                    let why = "json_file_not_found"
                    let searchContent = checkDetails.contains
                    let searchIsNot = checkDetails.contains_is_not
                    let containsType = checkDetails.contains_type

                    if (true == pass) {
                        const ifFilePath = './'+ifFile
                        const ifFileContent = require(ifFilePath)
                        console.log(process.cwd())
                        if ("key" == containsType) {
                            // let chain = []
                            // for (let i = 0; i < searchContent.length; i++) {
                            //     chain.push(searchContent[i])
                            // }
                            console.log(process.cwd())
                            var searchIs = Hoek.reach(ifFileContent,searchContent)
                            console.log(process.cwd())
                            console.log("SEARCHIS:",searchIs)
                            pass = (null != searchIs && searchIsNot != searchIs)
        
                        } else { // add in "else if" clause if searching for json value
                            console.log("Content type not recognised.")
                            pass = false
                        }

                        if (true == pass) {
                            file = searchIs
                            console.log("FILE:",file)
                            pass = Fs.existsSync('./'+file)

                            if (true == pass) {
                            why = "file_found"
                            } else {
                                why = "file_not_found"
                            }
                        } else {
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
        
                content_contain_string: async function(checkDetails) {
        
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
                    let searchContent = checkDetails.contains
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const filePath = './'+file
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
        
                content_contain_json: async function(checkDetails) {
        
                    let file = checkDetails.file
                    let pass = Fs.existsSync('./'+file)
                    let searchContent = checkDetails.contains
                    let containsType = checkDetails.contains_type
                    // let searchLevels = Object.values(searchContent)
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const filePath = './'+file
                        const fileContent = require(filePath)
                        if ("key" == containsType) {
                            // clean this up
                            // let chain = []
                            // for (let i = 0; i < searchContent.length; i++) {
                            //     chain.push(searchContent[i])
                            // }
                            pass = (null != (Hoek.reach(fileContent,searchContent)))
        
                        } else { // add in "else if" clause if searching for json value
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
        
        // -------------------------------------------------------
        runAll()
        // -------------------------------------------------------

    } // end of run()
    
} // end of Maintain class

module.exports = {
    Maintain
}