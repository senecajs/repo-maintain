const Fs = require('fs')
const _ = require('underscore')

const results = require('../data/json/results.json')

let filter = []

async function doFilter() {
  console.log("ITEMS TO FILTER : ", results.length)
  let filterList = _.where(results, {name : "seneca"})

  filterList.forEach(item => {
    filter.push(item)
  });

  Fs.writeFileSync("../data/json/filter.json", JSON.stringify(filter))

  console.log("FILTERED ITEMS : ", filter.length)
  
}

doFilter()