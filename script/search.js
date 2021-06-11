const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script

async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=3')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  let summary = json.items.map(item=>{
    const data = new Map()
    data.set("repo",item.html_url)
    data.set("owner",item.owner.login)
    data.set("name",item.name)
    data.set("desc",item.description)
    data.set("update",item.updated_at.substring(0,10))
    // missing type (the "what")
    return data.values()
  })

  // use (writable) file stream? / Use forEach callback?
  var headings = "Repo,Owner,Name,Description,LastUpdate" // insert what later
  // fs.writeFileSync("../csv/testing/initialTest.csv", headings) // ""../csv/testing/initialTest.csv" <= are relative file paths possible?

  // summary.forEach((value, heading, summary) => {
  //   // fs.appendFile("../csv/testing/initialTest.csv", this.values() + ",")
  //   // console.log(this.values() + ",")
  //   console.log(this)
  //   // fs.appendFile("../csv/testing/initialTest.csv", "\r\n")
  //   // console.log("Next item...")
  // });

  console.log(summary)
}

doSearch()


