const Fetch = require('node-fetch')
const Fs = require('fs')  // invite file system module to script
const jsonFile = require ('jsonfile')

// get current year
const today = new Date()
const thisYear = today.getFullYear()

// check if results.json exists, and if so, clear it
let results = "../data/json/results.json"
if(Fs.existsSync(results)){
  Fs.unlinkSync(results)
  console.log("Previous results.json file deleted.")
}

async function doSearch() {
  console.log("Search function initiated.")

  // Object better than map for when json is involved
  let obj = {}
  let nbRepos = 0
  // increment year to search
  for (let year = 2010; year <= thisYear; year++) {
    // increment page of search results + reset nbRepos for each year
    nbRepos = 0
    for (let page = 1; page <= 10; page++) {

      await new Promise(resolve => setTimeout(resolve,7777))

      let searchURL = "https://api.github.com/search/repositories?q=seneca-+created:%3C" + year + "-01-01&page=" + page + "&per_page=100"
      
      const response = await Fetch(searchURL)
      const body = await response.text()
      const json = JSON.parse(body)
      // catching error
      const ok = response.ok
      if(null == json.items) {
        console.log("BAD json!!! :(", json)
      }

      console.log("[", year, "| pg", page, "]", json.items.length, "results fetched... ", ok)
      
      // if clause causes unneccessary searching through map
      // nbRepos variable to count logged repos for this year only
      json.items.forEach(item => {
        obj[item.full_name] = item
        nbRepos++
      });

      // ??
      // nbRepos = [Object[map]].length

      if(json.total_count <= 100){
        break
      }

      if(json.items.length == 0){
        break
      }
    }

    console.log("[", year, ":", nbRepos, "results mapped. ]")

  }

  var objValues = Object.values(obj)
 
  jsonFile.writeFileSync("../data/json/results.json", objValues, {flag: 'a', EOL: ',', finalEOL: false})

  console.log("Search completed.", objValues.length, "repos total. See results.json file for logged data.")
  // console.log("Search completed.")
}

doSearch()
