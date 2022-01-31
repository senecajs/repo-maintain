const Fetch = require('node-fetch')
const Fs = require('fs')
const jsonFile = require('jsonfile')

const today = new Date()
const thisYear = today.getFullYear()

async function doSearch() {
  console.log('Search function initiated.')

  let obj = {}
  let nbRepos = 0

  // increment year to search (start: 2010)
  for (let year = 2010; year <= thisYear; year++) {
    // increment page of search results + reset nbRepos for each year
    nbRepos = 0
    for (let page = 1; page <= 10; page++) {
      await new Promise((resolve) => setTimeout(resolve, 7777))

      let searchURL =
        'https://api.github.com/search/repositories?q=seneca-+created:%3C' +
        year +
        '-01-01&page=' +
        page +
        '&per_page=100'

      const response = await Fetch(searchURL)
      const body = await response.text()
      const json = JSON.parse(body)
      // catching error
      const ok = response.ok
      if (null == json.items) {
        console.log('BAD json!!! :(', json)
      }

      console.log(
        '[',
        year,
        '| pg',
        page,
        ']',
        json.items.length,
        'results fetched... ',
        ok
      )

      json.items.forEach((item) => {
        obj[item.full_name] = item
        nbRepos++
      })

      if (json.total_count <= 100) {
        break
      }

      if (json.items.length == 0) {
        break
      }
    }

    console.log('[', year, ':', nbRepos, 'results mapped. ]')
  }

  var objValues = Object.values(obj)

  // previously results.json
  jsonFile.writeFileSync('./data/json/searchResults.json', objValues, {
    EOL: ',',
    finalEOL: false,
  })

  console.log(
    'Search completed.',
    objValues.length,
    'repos total. See searchResults.json file for logged data.'
  )
}

doSearch()
