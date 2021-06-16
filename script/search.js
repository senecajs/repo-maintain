const Fetch = require('node-fetch')
const fs = require('fs')  // invite file system module to script


async function doSearch() {
  const response = await Fetch('https://api.github.com/search/repositories?q=seneca-&page=1&per_page=10')
  const body = await response.text()
  const json = JSON.parse(body)
  console.log('TOTAL', json.total_count)
  console.log('ITEMS LEN', json.items.length)

  // use (writable) file stream? / Use forEach callback?
  var headings = "Repo,Owner,Name,Description,LastUpdate\r\n" // insert what later
  fs.writeFileSync("../csv/testing/initialTest.csv", headings)
 
  let dataToSave = ""
  // let relevant = empty json blob (?)

  /**
   * "if" clauses here only deal with SenecaJS repos
   * json.items.forEach(maybe => {
   *  if (maybe["owner"]["login"] == "senecajs"){
   *   add maybe to relevant (formatted as json)
   *  }
   *  if x then y etc etc
   * })
   */

  json.items.forEach(repo => { // replace json.items with relevant

    let url = repo["html_url"]
    let owner = repo["owner"]["login"]
    let name = repo["name"]
    let desc = repo["description"]
    // let type = repo["the what"]
    let update = repo["updated_at"].substring(0,10)

    
    dataToSave = url + "," + owner + "," + name + "," + "'" + desc + "'" + "," + update
    fs.appendFileSync("../csv/testing/initialTest.csv", dataToSave)
    fs.appendFileSync("../csv/testing/initialTest.csv", "\r\n")

    
  });

  console.log("See ../csv/testing/initialTest.csv for printed values.")
}

// Google Sheets API - specific requirements
const readline = require('readline')
const {google} = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

function doSheets(){
  // send file to google sheets using API
  // Cloud function -> node js ?
}

doSearch()
//doSheets()

