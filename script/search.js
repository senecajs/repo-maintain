/**
 * 1) Move out code that doesn't pertain to initial search function
 * 2) Steps for process:
 *    a) search.js - Take 1803 full results and save to disk
 *    b) filter.js - Take relevant results from (a) and save to disk
 *    c) isolate.js - Isolate relavant data from (b) and save to disk
 *    d) upload.js - Upload (c) data to google sheets
 * 3) CSV management plugin (possibly JSON to CSV ?)
 */

const Fetch = require('node-fetch')
const Fs = require('fs')  // invite file system module to script

// check if results.json exists, and if so, clear it
let results = "../data/json/results.json"
if(Fs.existsSync(results)){
  Fs.unlinkSync(results)
  console.log("Previous results.json file deleted.")
}

async function doSearch() {
  console.log("Search function initiated.")

  await new Promise(resolve => setTimeout(resolve,1111))
  
  let searchURL = "https://api.github.com/search/repositories?q=seneca-&page=" + page.toString() + "&per_page=100"
  const response = await Fetch(searchURL)
  console.log("["+page+"]"+" 100 results fetched...")
  logged += 100
  page += 1

  // append all data + stringify
  const body = await response.text()
  const json = JSON.parse(body)
  total = json.total_count
  
  // append to file - not overwrite (taking for loop into account...)
  Fs.appendFileSync("../data/json/results.json", JSON.stringify(json.items))
  console.log("["+page+"]"+" Results appended to file.")
}

let page = 1 // page number
let logged = 0 // total number of repos logged
let total = 101

while (logged < total) {
  doSearch()
}


