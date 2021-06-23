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
const _ = require('underscore')

const results = require('../data/json/results.json')


// check if relevant.json exists, and if so, clear it
if(Fs.existsSync("../data/json/relevant.json")){
  Fs.unlinkSync("../data/json/relevant.json")
  console.log("Previous relevant.json file deleted.")
}

let filter = []

async function doFilter() {
  console.log("ITEMS : ", results.length)
  let filterList = _.where(results, {name : "seneca"})

  filterList.forEach(item => {
    filter.push(item)
  });

  Fs.appendFileSync("../data/json/filter.json", JSON.stringify(filter))

  console.log(filter)
  console.log(filter.length)
  
  // Fs.appendFileSync("../data/json/relevant.json", JSON.stringify(json.items))
}

doFilter()