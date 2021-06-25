/**
 * 1) Move out code that doesn't pertain to initial search function
 * 2) Steps for process:
 *    a) search.js - Take 1803 full results and save to disk
 *    b) filter.js - Take relevant results from (a) and save to disk
 *    c) isolate.js - Isolate relavant data from (b) and save to disk
 *    d) format.js - Reformat json data as csv data.
 *    e) upload.js - Upload (d) data to google sheets
 */

const Fetch = require('node-fetch')
const Fs = require('fs')  // invite file system module to script

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

  const map = {}
  // increment year to search
  for (let year = 2010; year <= thisYear; year++) {
    // increment page of search results
    for (let page = 1; page <= 10; page++) {

      await new Promise(resolve => setTimeout(resolve,9999))

      let searchURL = "https://api.github.com/search/repositories?q=seneca-+created:%3C" + year.toString() + "-01-01&page=" + page.toString() + "&per_page=100"
      const response = await Fetch(searchURL)
      const body = await response.text()
      const json = JSON.parse(body)
      // catching error
      const ok = response.ok
      if(null == json.items) {
        console.log("BAD!!! :(", json)
      }

      console.log("[", year, "|", page, "]", json.items.length, " results fetched... ", ok)
      
      json.items.forEach(item => {
        // issue with map.has
        if(false == map.has(item.full_name)){
          map[item.full_name] = item
        }
        
      });
    }

    
    
    // append to file - not overwrite (taking for loop into account...)
    console.log("[", year, "]", " Results appended to map.")

    // console.log(json.items)
  }

  Fs.writeFileSync("../data/json/results.json", JSON.stringify(map.values()))
  console.log("Map values logged as JSON data.")

  console.log("Search completed. See results.json file for logged data.")
}

doSearch()
