const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script

async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=3')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  // use (writable) file stream? / Use forEach callback?
  var headings = "Repo,Owner,Name,Description,LastUpdate\r\n" // insert what later
  fs.writeFileSync("../csv/testing/initialTest.csv", headings)
 
  let summary = json.items.map(item=>{
    const data = new Map()
    data.set("repo",item.html_url)
    data.set("owner",item.owner.login)
    data.set("name",item.name)
    data.set("desc",item.description)
    // missing type (the "what")
    data.set("update",item.updated_at.substring(0,10))
    
    // to stringify map values
    function mapToObject(map){
      const object = {}
      for (let [key, value] of map){
        object[key] = value
      }
      return object
    }
    const jsonData = {}
    jsonData.data = mapToObject(data)
    const dataToSave = JSON.stringify(jsonData)

    fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
    fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n")
  })

  


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


