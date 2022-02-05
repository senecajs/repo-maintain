module.exports = {
  filter: async function (searchResults) {
    // Node modules
    // const Fs = require('fs')

    // return doFilter()
    // async function doFilter() {
    let filter = []
    console.log('ITEMS TO FILTER : ', searchResults.length)
    let collegeDash = /-college/i
    let collegeUnderscore = /_college/i
    let collegeDesc = /college/i
    let uniDesc = /university/i

    for (let i = 0; i < searchResults.length; i++) {
      let item = searchResults[i]
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
    }

    // Fs.writeFileSync('./data/json/filter.json', JSON.stringify(filter))

    console.log('ITEMS TO FILTER : ', searchResults.length)
    console.log('ITEMS AFTER FILTER : ', filter.length)
    console.log('REMOVED : ', searchResults.length - filter.length)

    return filter
    // }
  },
}
