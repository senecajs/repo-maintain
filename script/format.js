// npm packages
const Fs = require('fs')
const Export = require ('jsonexport')

const Input = Fs.createReadStream("../data/json/results.json")
const Output = Fs.createWriteStream("../data/csv/results.csv")

// check if results.csv exists, and if so, clear it
let results = "../data/csv/results.csv"
if(Fs.existsSync(results)){
  Fs.unlinkSync(results)
  console.log("Previous results.csv file deleted.")
}

// create csv file from json file
Input.pipe(Export()).pipe(Output)
console.log("JSON data successfully reformatted as CSV. See results.csv")