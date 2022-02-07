module.exports = {
  search: async function () {
    // Node modules
    const today = new Date()
    const thisYear = today.getFullYear()

    // External modules
    const Fetch = require('node-fetch')

    console.log('\nSearch function initiated.\n')

    let searchResults = []
    let nbRepos = 0

    // increment year to search (start: 2010)
    // for (let year = 2010; year <= thisYear; year++) {
    for (let year = 2010; year <= 2012; year++) {
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
        if (!response.ok) {
          console.info('Error fetching results from ', year, ' page ', page)
          continue
        }

        console.log(
          '[',
          year,
          '| pg',
          page,
          ']',
          json.items.length,
          'results fetched... '
        )

        json.items.forEach((item) => {
          searchResults.push(item)
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

    console.log('\nSearch completed.', searchResults.length, 'repos total.')

    return searchResults
  },
}
