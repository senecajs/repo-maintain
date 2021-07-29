const Fs = require('fs')
const Path = require('path')
const checkList = require('../design/checks/checks.js')

const checkResultsRaw = Fs.readFileSync('../data/json/allChecks.json')
let checkResults = JSON.parse(checkResultsRaw)

async function genHeadings(){
    let headings = ["Package", "PASS?", "orgRepo"]
    for(checkName in checkList){
        // let checkDetails = checkList[checkName]
        // let kind = checkDetails.kind
        // let file = checkDetails.file
        // let headingName = kind+"@"+file
        
        // if ("content_contain" == kind) {
        //     let content = checkDetails.contains
        //     headingName += "("+content+")"
        // }

        let headingName = checkName
        headings.push(headingName)
    }
    // console.log(headings)
    console.log("Headings created.")
    return headings
}


async function genData(headings, object) {
    // headings = names to show as headings of table
    // object = object to search for data within

    dataSet = []
    for(repo in object) {
        repoData = {}
        repoData.package = Path.basename(repo)
        repoData.PASS = "pass"
        repoData.orgRepo = repo
        let orgRepo = object[repo]
        for (let i = 3; i < headings.length; i++) {
            let checkName = headings[i]
            let checkDetails = orgRepo[checkName]
            if (false == checkDetails.pass) {
                repoData[checkName] = "FAIL"
                repoData.PASS = "FAIL"
            } else {
                repoData[checkName] = "pass"
            }
            
        }
        var repoDataValues = Object.values(repoData)
        dataSet.push(repoDataValues)
    }
    // console.log(dataSet)
    return dataSet
    console.log("Data generated.")
}

async function genReport(headings, data) {
    let reportArray = []

    let head = headings.join("|")
    reportArray.push(head)

    let sepLine = []
    for (let i = 0; i < headings.length; i++) {
        sepLine.push("---")
    }
    let sep = sepLine.join("|")
    reportArray.push(sep)

    for (let j = 0; j < data.length; j++) {
        let plugin = data[j]
        let formatted = plugin.join("|")
        reportArray.push(formatted)
    }

    let report = reportArray.join("\n")
    console.log(report)
    return report
}

async function run() {
    let headings = await genHeadings()
    let data = await genData(headings, checkResults)
    let createReport = await genReport(headings,data)
    
    Fs.writeFileSync('../REPORT.md', createReport)
}

run()