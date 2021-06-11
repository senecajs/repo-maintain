
const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script

/**
 * HOW to insert data to spreadsheet?
 * 1) Automate collecting data as json blob, save as file
 *    using fs, transfer to csv format by hand (using online
 *    converter), upload and import manually to google sheets
 *    using Sheetgo add-on
 * 2) Automate collecting data as json blob, automate transfer
 *    to csv format within script (using vscode extensions/
 *    node modules?), save as file using fs, upload and import
 *    manually to google sheets
 * 3) Automate collecting data as csv, save file using fs,
 *    upload and import manually to google sheets
 * 
 * => Solution 3 might be the fastest/least hassle
 * a) create manual csv string (headings)
 * 
 */


async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=3')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  let summary = json.items.map(item=>({
    repo: item.html_url,
    owner: item.owner.login,
    name: item.name,
    desc: item.description,
    // type: item.foo, // still need to figure out how to get this
    update: item.updated_at,

/**
 * TESTS to tell apart items (the what - core/plugin/support)
 * 
 * homepage: item.homepage,
 * mirror: item.mirror_url,
 * Not gonna work --> Scan text in README to find mention of string "plugin"=true ? Include version with/without hyphen, capitals, etc (unnecs complex?)
 * Top-down appraoch => figure this out later
 *    
 */


  }))

  console.log(summary)
  // NEXT STEP: test saving them to file as json blob (or directly as csv?)
  
  // console.log(json)
}

/**
 * HEADINGS for catalogue (just a reference)
 * 
 * Repo (url) : item.html_url
 * Owner : item.owner.login
 * Name :  item.name
 * Description : item.description
 * What (core/plugin/support) : 
 * lastUpdate : item.updated_at (take the first 10
 *              characters of the string to match 
 *              date format)
 */

doSearch()


