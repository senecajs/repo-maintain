// npm packages
const Fs = require('fs')
const Export = require ('jsonexport')

// GITHUB SEARCH API RESULTS
// const Input = Fs.createReadStream("../data/json/results.json")
// const Output = Fs.createWriteStream("../data/csv/results.csv")

// // create csv file from json file
// Input.pipe(Export()).pipe(Output)
// console.log("JSON data successfully reformatted as CSV. See results.csv for data.")

// PLUGIN CHECKS
const Input = Fs.createReadStream("../data/json/pluginChecks.json")
const Output = Fs.createWriteStream("../data/csv/pluginChecks.csv")

// create csv file from json file
Input.pipe(Export()).pipe(Output)
console.log("JSON data successfully reformatted as CSV. See pluginChecks.csv for data.")