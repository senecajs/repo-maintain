// isolate data required for google sheets
const Fs = require('fs')
const _ = require('underscore')

const filter = require('../data/json/filter.json')

// delete json file if it exists already
if(Fs.existsSync("../data/json/data.json")){
  Fs.unlinkSync("../data/json/data.json")
  console.log("Previous data.json file deleted.")
}

// need keys+values in json file for format.js to work correctly
async function doIsolate() {
  console.log("ITEMS : ", filter.length)
  // _method to select ?
}

// json.items.forEach(repo => { // replace json.items with relevant

//   let url = repo.html_url
//   let owner = repo.owner.login
//   let name = repo.name
//   let desc = repo.description
//   // let type = repo.(the what)
//   let update = repo.updated_at.substring(0,10)
  
//   dataToSave = url + "," + owner + "," + name + "," + "'" + desc + "'" + "," + update
//   Fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
//   Fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n") // just \n in unix
//   //rename csv to data
  
// });

doIsolate()
