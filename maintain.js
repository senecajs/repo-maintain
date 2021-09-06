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

        async function runChecksPrep() {
            
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

            return {
                relCheckList: relCheckList,
                dataForChecks: dataForChecks
            }
        }

        async function runChecks() {
            let prep = await runChecksPrep()
            let relCheckList = prep.relCheckList
            let dataForChecks = prep.dataForChecks
            let results = {}
            
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
                let res = await checkKind(checkDetails,dataForChecks)
                results[checkName] = res
            }   
            
            return results

        }

        async function conclusion(checkResults) {
            let totalNb = 0
            let failNb = 0
            let note = ""
            let fails = []
            for (const check in checkResults) {
                totalNb++
                let checkDetails = checkResults[check]
                checkDetails.name = check
                if (false == checkDetails.pass) {
                    failNb++
                    let failWhy = checkDetails.check + " (" + checkDetails.why + ")"
                    fails.push(failWhy)
                }
            }
            if (0 == failNb){
                note = "Congratulations! Your plugin meets all of the current standards."
            } else {
                note = "Please refer to the README.md document for descriptions of all checks."
            }
            fails = fails.join('\n\t')
            let message = `Total checks: ${totalNb}\nFailed checks: ${failNb}\n\t${fails}\n${note}`
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
                file_exist: async function(checkDetails,dataForChecks) {
                    let file = checkDetails.file
                    let pass = file in dataForChecks
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

                fileX_exist_if_contain_json: async function(checkDetails,dataForChecks) {
        
                    let file = checkDetails.file
                    let ifFile = checkDetails.if_file
                    let pass = ifFile in dataForChecks
                    let why = "json_file_not_found"
                    let searchContent = checkDetails.contains
                    let searchIsNot = checkDetails.contains_is_not
                    let containsType = checkDetails.contains_type
                    let config = checkDetails.config

                    if (true == pass) {
                        const ifFileContent = dataForChecks[ifFile]
                        if ("key" == containsType) {
                            // let chain = []
                            // for (let i = 0; i < searchContent.length; i++) {
                            //     chain.push(searchContent[i])
                            // }
                            var searchIs = Hoek.reach(ifFileContent,searchContent)
                            pass = (null != searchIs && searchIsNot != searchIs)
        
                        } else { // add in "else if" clause if searching for json value
                            console.log("Content type not recognised.")
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
                            } else {
                                why = "file_not_found"
                            }
                        } else {
                            why = "incorrect_value"
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
        
                content_contain_string: async function(checkDetails,dataForChecks) {
        
                    let file = checkDetails.file
                    let pass = file in dataForChecks
                    let searchContent = checkDetails.contains
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const fileContent = dataForChecks[file]

                        for (let i = 0; i < searchContent.length; i++) {
                            pass = fileContent.includes(searchContent[i])
                        }
                        
                        if (true == pass) {
                            why = "content_found"
                        } else {
                            why = "content_not_found"
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
        
                content_contain_json: async function(checkDetails,dataForChecks) {
        
                    let file = checkDetails.file
                    let pass = file in dataForChecks
                    let searchContent = checkDetails.contains
                    let containsType = checkDetails.contains_type
                    // let searchLevels = Object.values(searchContent)
                    let why = "file_not_found"
        
                    if (true == pass) {
                        const fileContent = dataForChecks[file]
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
                            why = "content_found"
                        } else {
                            why = "content_not_found"
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
        
        // -------------------------------------------------------
        runAll()
        // -------------------------------------------------------

    }
    
}

module.exports = {
    Maintain
}