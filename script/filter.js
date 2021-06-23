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
if(Fs.existsSync("../data/json/filter.json")){
  Fs.unlinkSync("../data/json/filter.json")
  console.log("Previous filter.json file deleted.")
}

let filter = []

async function doFilter() {
  console.log("ITEMS TO FILTER : ", results.length)
  let filterList = _.where(results, {name : "seneca"})

  filterList.forEach(item => {
    filter.push(item)
  });

  Fs.appendFileSync("../data/json/filter.json", JSON.stringify(filter))

  console.log("FILTERED ITEMS : ", filter.length)
  
  // Fs.appendFileSync("../data/json/relevant.json", JSON.stringify(json.items))
}

doFilter()