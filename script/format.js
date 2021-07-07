// npm packages
const Fs = require('fs')
const Export = require ('jsonexport')

// GITHUB SEARCH API RESULTS
// const Input = Fs.createReadStream("../data/json/results.json")
// const Output = Fs.createWriteStream("../data/csv/results.csv")

// // check if results.csv exists, and if so, clear it
// let results = "../data/csv/results.csv"
// if(Fs.existsSync(results)){
//   Fs.unlinkSync(results)
//   console.log("Previous results.csv file deleted.")
// }

// // create csv file from json file
// Input.pipe(Export()).pipe(Output)
// console.log("JSON data successfully reformatted as CSV. See results.csv for data.")

// PLUGIN CHECKS
const Input = Fs.createReadStream("../data/json/pluginChecks.json")
const Output = Fs.createWriteStream("../data/csv/pluginChecks.csv")

// check if results.csv exists, and if so, clear it
let checks = "../data/csv/pluginChecks.csv"
if(Fs.existsSync(checks)){
  Fs.unlinkSync(checks)
  console.log("Previous pluginChecks.csv file deleted.")
}

// create csv file from json file
Input.pipe(Export()).pipe(Output)
console.log("JSON data successfully reformatted as CSV. See pluginChecks.csv for data.")