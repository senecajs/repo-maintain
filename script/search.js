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
  
  // console.log("Links: " + searchURL.link)
  let logged = 0
  let results = []
  // exit clause for for-loop (once all results have been logged) ?
  // data for # pages held in native code
  for (let page = 1; page < 11; page++) {
    let searchURL = "https://api.github.com/search/repositories?q=seneca-&page=" + page.toString() + "&per_page=100"
    const response = await Fetch(searchURL)
    const body = await response.text()
    const json = JSON.parse(body)
    
    // undefined coming up for page 11 in loop of 100 (page 10 for loop of 50)
    // Now it's page 10 ??
    console.log("[" + page + "] " + json.items.length + " results fetched...")
    logged += json.items.length
    
    json.items.forEach(item => {
      results.push(item)
    });
    
    // append to file - not overwrite (taking for loop into account...)
    console.log("["+page+"]"+" Results appended to object.")

    // console.log(json.items)
  }

  Fs.appendFileSync("../data/json/results.json", JSON.stringify(results))
  console.log("Object logged as JSON data.")

  console.log("Search completed. See results.json file for logged data.")
}

doSearch()
