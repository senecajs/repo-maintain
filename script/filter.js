const Fs = require('fs')

const results = require('../data/json/searchResults.json')

let filter = []

async function doFilter() {
  console.log('ITEMS TO FILTER : ', results.length)
  let filterList = results
  let collegeDash = /-college/i
  let collegeUnderscore = /_college/i
  let collegeDesc = /college/i
  let uniDesc = /university/i

  filterList.forEach((item) => {
    if (
      collegeDash.test(item.name) |
      collegeUnderscore.test(item.name) |
      collegeDesc.test(item.description) |
      uniDesc.test(item.description) |
      (0 == item.size)
    ) {
      console.log(item.name)
    } else {
      filter.push(item)
    }
  })

  Fs.writeFileSync('./data/json/filter.json', JSON.stringify(filter))

  console.log('ITEMS TO FILTER : ', results.length)
  console.log('FILTERED ITEMS : ', filter.length)
  console.log('REMOVED : ', results.length - filter.length)
}

doFilter()
