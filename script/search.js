
const Fetch = require('node-fetch')


async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=3')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  // let summary = json.items.map(item=>({
  //   name: item.name,
  //   owner: item.owner.login,
  // }))

  // console.log(summary)

  console.log(json)
}

/**
 * HEADINGS for catalogue
 * 
 * Repo (url) : item.html_url
 * Owner : item.owner.login
 * Name :  item.name
 * Description : item.description
 * What (core/plugin/support) : 
 * lastUpdate : item.updated_at
 */

doSearch()


