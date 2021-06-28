const Fetch = require('node-fetch')
const Fs = require('fs')  // invite file system module to script

// dependencies for auth
const Axios = require ('axios')
const Express = require ('express')
const App = express()
// consts for auth
const clientID = '10324b11c94236aa4b99'
const clientSecret = '541bd55a0f7a54c715218c0ade437edb595518d3'

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
  // one authentication request for function here?

  const map = {}
  // increment year to search
  for (let year = 2010; year <= 2019; year++) { // year <= thisYear; year++) {
    // increment page of search results
    for (let page = 1; page <= 50; page++) {

      await new Promise(resolve => setTimeout(resolve,1111))

      // or one authentication request per search?
      let searchURL = "https://api.github.com/search/repositories?q=seneca-+created:%3C" + year.toString() + "-01-01&page=" + page.toString() + "&per_page=100"
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
        // issue with map.has
        // if(false == map.has(item.full_name)){
        //   
        // }
        map[item.full_name] = item
      });

      if(json.items.length <= 100){
        break
      }
    }

    
    
    // append to file - not overwrite (taking for loop into account...)
    console.log("[", year, "]", " Results appended to map.")

    // console.log(json.items)
  }

  // Fs.writeFileSync("../data/json/results.json", JSON.stringify(map.values()))
  // console.log("Map values logged as JSON data.")

  // console.log("Search completed. See results.json file for logged data.")
  console.log("Search completed.")
}

doSearch()
