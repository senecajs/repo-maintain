 /**
   * "if" clauses here only deal with SenecaJS repos (accept/reject list)
   * json.items.forEach(maybe => {
   *  if (maybe["owner"]["login"] == "senecajs"){
   *   add maybe to relevant (formatted as json)
   *  }
   *  if x then y etc etc
   * })
   */

const Fs = require('fs')

const results = require('../data/json/results.json')


// check if relevant.json exists, and if so, clear it
let relevant = "../data/json/relevant.json"
if(Fs.existsSync(relevant)){
  Fs.unlinkSync(relevant)
  console.log("Previous relevant.json file deleted.")
}

async function doFilter() {
  // read json file
  console.log("ITEMS : ", results.length)
  
  // Fs.appendFileSync("../data/json/relevant.json", JSON.stringify(json.items))
}

doFilter()