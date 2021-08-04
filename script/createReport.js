const Fs = require('fs')
const Path = require('path')
const { isNumber } = require('util')
const checkList = require('../design/checks/checks.js')

const checkResultsRaw = Fs.readFileSync('../data/json/allChecks.json')
let checkResults = JSON.parse(checkResultsRaw)

async function genHeadings(){
    let headings = ["Package", "PASS?", "orgRepo", "Fails", "Forks", "Stars", "Open Issues", "Open PRs"]
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
        let orgRepo = object[repo]
        repoData.package = Path.basename(repo) // this needs to come from package.json name value
        repoData.PASS = "pass"
        repoData.orgRepo = "["+repo+"](https://github.com/"+repo+")"

        repoData.fails = ""
        for (check in orgRepo) {
            checkDetails = orgRepo[check]
            if (false == checkDetails.pass) {
                repoData.fails += check+" "
                console.log(check)
            }
        }

        // let nb = 0
        // for (plugin in checkResults) {
        //     allChecks = checkResults[plugin]
        //     console.log("\n\n",plugin)
        //     nb++
        //     for (check in allChecks) {
        //         checkDetails = allChecks[check]
        //         if (false == checkDetails.pass) {
        //             repoData.fails += check,", "
        //             console.log(check)
        //         }
        //     }
        // }
        // console.log(nb)
        
        for (let i = 4; i < headings.length; i++) {
            let title = headings[i]
            repoData[title] = "apiData"
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