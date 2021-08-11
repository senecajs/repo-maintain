const Fs = require('fs')
const Path = require('path')
const Fetch = require('node-fetch')
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
        let names = repo.split('##')
        let repoName = names[0]
        let pkgName = names[1]
        repoData.package = "["+pkgName+"](https://www.npmjs.com/package/"+pkgName+")" // this should be a url to npm
        repoData.PASS = "pass"
        repoData.orgRepo = "["+repoName+"](https://github.com/"+repoName+")"

        repoData.fails = ""
        for (check in orgRepo) {
            checkDetails = orgRepo[check]
            if (false == checkDetails.pass) {
                repoData.fails += check+" "
                repoData.PASS = "FAIL"
            }
        }

        // HITTING api rate limit
        // let forksRaw = await Fetch('https://api.github.com/repos/'+repoName+'/forks')
        // let forksText = await forksRaw.text()
        // let forksJson = JSON.parse(forksText)
        // let forksNb = forksJson.length

        // let starsRaw = await Fetch('https://api.github.com/repos/'+repoName+'/stargazers')
        // let starsText = await starsRaw.text()
        // let starsJson = JSON.parse(starsText)
        // let starsNb = starsJson.length

        // repoData.forks = forksNb
        // repoData.stars = starsNb
        
        for (let i = 4; i < headings.length; i++) {
            let title = headings[i]
            repoData[title] = "apiData"
        }
        var repoDataValues = Object.values(repoData)
        dataSet.push(repoDataValues)
    }
    // console.log(dataSet)
    console.log("Data generated.")
    return dataSet
    
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