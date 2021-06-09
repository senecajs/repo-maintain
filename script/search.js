
const Fetch = require('node-fetch')


async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  let summary = json.items.map(item=>({
    name: item.name,
    owner: item.owner.login,
  }))

  console.log(summary)
}


doSearch()


