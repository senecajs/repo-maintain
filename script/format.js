// npm packages
const Fs = require('fs')
const Export = require ('jsonexport')

const Input = Fs.createReadStream("../data/json/data.json")
const Output = Fs.createWriteStream("../data/csv/data.csv")

// create csv file from json file
Input.pipe(Export()).pipe(Output)