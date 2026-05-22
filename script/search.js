module.exports = {
  search: async function (githubToken = null) {
    const Fetch = require('node-fetch')
    const today = new Date()
    const thisYear = today.getFullYear()

    console.log('\nSearch function initiated.\n')
    const startTime = Date.now()

    let searchResults = []

    const headers = {}
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`
      console.log('Using GitHub token — rate limit: 5000 req/hour')
    } else {
      console.log('No token — rate limit: 60 req/hour (slow mode)')
    }

    for (let year = 2010; year <= thisYear; year++) {
      let nbRepos = 0

      for (let page = 1; page <= 10; page++) {
        const delay = githubToken ? 200 : 3000
        await new Promise((resolve) => setTimeout(resolve, delay))

        const searchURL =
          `https://api.github.com/search/repositories` +
          `?q=seneca-+created:${year}-01-01..${year}-12-31` +
          `&page=${page}&per_page=100`

        let response
        try {
          response = await Fetch(searchURL, { headers })
        } catch (err) {
          console.error(`Network error on ${year} page ${page}:`, err.message)
          break
        }

        const remaining = parseInt(response.headers.get('x-ratelimit-remaining') || '999')
        if (remaining < 5) {
          const resetAt = parseInt(response.headers.get('x-ratelimit-reset') || '0')
          const waitMs = Math.max((resetAt * 1000) - Date.now(), 0) + 1000
          console.warn(`Rate limit! Waiting ${Math.ceil(waitMs/1000)}s...`)
          await new Promise((resolve) => setTimeout(resolve, waitMs))
        }

        if (!response.ok) {
          console.info(`Error ${response.status} on year ${year} page ${page}`)
          break
        }

        const json = await response.json()
        console.log(`[ ${year} | pg ${page} ] ${json.items.length} results fetched...`)

        json.items.forEach((item) => searchResults.push(item))
        nbRepos += json.items.length

        if (json.items.length === 0) break

        if (json.total_count <= 100) break
      }

      console.log(`[ ${year}: ${nbRepos} results mapped. ]`)
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
    console.log(`\nSearch completed. ${searchResults.length} repos found in ${elapsed}s\n`)

    return searchResults
  },
}