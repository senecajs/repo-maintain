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

async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=10')
  //save to disk ^ with for loop
  // append all data + stringify
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

}


doSearch() // output = 1803 json results


