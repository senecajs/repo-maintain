// COMMENTS to be edited to be purely informational once script is complete

const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script
const { listenerCount } = require('process')

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
 * i) Is there a way to automate the upload and import to
 *    google sheets ? Possibly, should there be an automation
 *    to check the site for new ones and add them to the sheet
 *    if needs be, and if so, included in this script or in its
 *    own one ?
 * 
 * => Solution 3 might be the fastest/least hassle
 * a) Create manual csv string (headings)
 * b) Write string to file (create file skeleton)
 * c) Append further lines (could be done with a foreach loop,
 *    and append \r\n (new row for each item in json blob))
 * i) Test above with first 3
 * 
 */


async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=3')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)


  // Gotta CLEAN all this up
  let summary = json.items.map(item=>{
    const data = new Map()
    data.set("repo",item.html_url)
    data.set("owner",item.owner.login)
    data.set("name",item.name)
    data.set("desc",item.description)
    data.set("update",item.updated_at.substring(0,10))
    // missing type (the "what")
    return data

  })



  // async function logData(){
  //   const map = new Map
  //   map.set('repo:', this.html_url)
  //   console.log(this.html_url)
  //   map.set('owner:', this.owner.login)
  //   map.set('name:', this.name)
  //   map.set('desc:', this.description)
  //   // map.set('type:', this.foo
  //   map.set('update:', this.updated_at.substring(0,10))
  //   console.log( map.values())
  // }

  // json.items.forEach(item=>{
  //   logData()
  // })


  /**
   * TESTS to tell apart items (the what - core/plugin/support)
   * 
   * homepage: item.homepage,
   * mirror: item.mirror_url,
   * Not gonna work --> Scan text in README to find mention of string "plugin"=true ? Include version with/without hyphen, capitals, etc (unnecs complex?)
   * Top-down appraoch => figure this out later
   *    
   */

  
  // console.log(Array.from(summary.keys()))
  // summary.forEach(logValueCSV)

  // use (writable) file stream? / Use forEach callback?
  var headings = "Repo,Owner,Name,Description,LastUpdate" // insert what later
  // fs.writeFileSync("../csv/testing/initialTest.csv", headings) // ""../csv/testing/initialTest.csv" <= are relative file paths possible?

  // summary.forEach((value, heading, summary) => {
  //   // fs.appendFile("../csv/testing/initialTest.csv", this.values() + ",")
  //   // console.log(this.values() + ",")
  //   console.log(this)
  //   // fs.appendFile("../csv/testing/initialTest.csv", "\r\n")
  //   // console.log("Next item...")
  // });

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


