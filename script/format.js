const Fs = require('fs')
const Export = require ('jsonexport')

const Input = Fs.createReadStream("../data/json/pluginChecks.json")
const Output = Fs.createWriteStream("../data/csv/pluginChecks.csv")

Input.pipe(Export()).pipe(Output)
console.log("JSON data successfully reformatted as CSV. See pluginChecks.csv for data.")