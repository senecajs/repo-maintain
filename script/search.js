const Fetch = require('node-fetch')
const Fs = require('fs')  // invite file system module to script
const jsonFile = require ('jsonfile')

// // dependencies for search
// const searchAPI = require ('github-search-api')
// const Github = new searchAPI({username: 'username', password: 'password'})

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

  let map = new Map()
  // increment year to search
  for (let year = 2010; year <= 2012; year++) { // year <= thisYear; year++) {
    // increment page of search results
    for (let page = 1; page <= 5; page++) {

      await new Promise(resolve => setTimeout(resolve,7777))

      let searchURL = "https://api.github.com/search/repositories?q=seneca-+created:%3C" + year.toString() + "-01-01&page=" + page.toString() + "&per_page=100"
      // using name+password auth
      // Github.searchRepos(searchURL, function(data){
      //   console.log(data)
      // })
      const response = await Fetch(searchURL)
      const body = await response.text()
      const json = JSON.parse(body)
      // catching error
      const ok = response.ok
      if(null == json.items) {
        console.log("BAD json!!! :(", json)
      }

      console.log("[", year, "|", page, "]", json.items.length, "results fetched... ", ok)
      
      json.items.forEach(item => {
        if(false == map.has(item.full_name)){
          map.set(item.full_name, item)
        }
        
      });

      // this doesn't break if later pages are empty
      if(json.total_count <= 100){
        break
      }

      
    }

    
    
    // append to file - not overwrite (taking for loop into account...)
    console.log("[", year, "]", " Results appended to map.")

    // console.log(json.items)
  }
  var mapValues = map.values()
  var nbRepos = 0
  var dataStream = Fs.createWriteStream('../data/json/results.json', {flags: 'a'})

  map.forEach(item => {
    dataStream.write(mapValues.next().value)
    dataStream.write(",")
    nbRepos++
  });
  console.log("Search completed.", nbRepos, "map values logged as raw txt data. See results.txt for more.")

  var rawData = Fs.readFileSync('../data/txt/results.txt')
  var parsedData = JSON.parse(rawData)
  Fs.writeFileSync('../data/json/results.json', JSON.stringify(parsedData))

  console.log("Parsing completed. See results.json file for logged data.")
  // console.log("Search completed.")
}

doSearch()
