const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script

async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=25')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  // use (writable) file stream? / Use forEach callback?
  var headings = "Repo,Owner,Name,Description,LastUpdate\r\n" // insert what later
  fs.writeFileSync("../csv/testing/initialTest.csv", headings)
 
  let dataToSave = ""

  json.items.forEach(repo => {

    // if clauses here to discount non-SenecaJS repos

    let url = repo["html_url"]
    let owner = repo["owner"]["login"]
    let name = repo["name"]
    let desc = repo["description"]
    // let type = repo["the what"]
    let update = repo["updated_at"].substring(0,10)

    
    dataToSave = url + "," + owner + "," + name + "," + desc + "," + update
    fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
    fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n")
    
  });
  
 
  

  // data.forEach((values,keys) => {
  //   dataToSave += values + ","
  //   console.log(values)
  // });
  
  // console.log(data)
  

  


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


