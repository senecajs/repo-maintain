module.exports = {
  filter: async function (searchResults) {
    console.log('\nFilter function initiated.\n')
    let filter = []
    console.log('Total items before filter : ', searchResults.length)
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
      } else {
        filter.push(item)
      }
    }

    console.log('Removed : ', searchResults.length - filter.length)
    console.log('Total items after filter : ', filter.length)

    return filter
  },
}
