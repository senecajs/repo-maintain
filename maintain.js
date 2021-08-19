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

        async function runChecks() {
            let results = {}
            
            // reading client's JSON files in
            const jsonPromise = Filehound.create() // only takes top-level JSON files
                .paths(process.cwd())
                .depth(0)
                .ext('json')
                .find();
            const jsonFiles = await jsonPromise // this returns "undefined" at the moment
            
            // non-JSON files
            const stringPromise = Filehound.create()
                .paths(process.cwd())
                .discard('node_modules')
                .discard('.json')
                .find();
            const stringFiles = await stringPromise
            
            let dataForChecks = {}
            
            for (let j = 0; j < jsonFiles.length; j++) {
                let filePath = jsonFiles[j]

                let fileName = Path.basename(filePath)
                let fileContent = require(filePath)
    
                dataForChecks[fileName] = fileContent
    
                //to get package name from package.json file
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

            let fileNameos = Object.keys(dataForChecks)

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