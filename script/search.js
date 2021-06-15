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
  // fs.writeFileSync("../csv/testing/initialTest.csv", headings)
 
  
  const data = new Map()
  data.set("repo",json.items["html_url"])
  data.set("owner",json.items["owner"])//["login"])
  data.set("name",json.items["name"])
  data.set("desc",json.items["description"])
  // missing type (the "what")
  data.set("update",json.items["updated_at"])//.substring(0,10))
  
  let dataToSave = ""

  data.values().forEach(value => {
    dataToSave += value + ","
  });
  
  console.log(dataToSave)
  // fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
  // fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n")
 

  


  // summary.forEach((value, heading, summary) => {
  //   // fs.appendFile("../csv/testing/initialTest.csv", this.values() + ",")
  //   // console.log(this.values() + ",")
  //   console.log(this)
  //   // fs.appendFile("../csv/testing/initialTest.csv", "\r\n")
  //   // console.log("Next item...")
  // });

  // console.log(summary)
}

doSearch()


