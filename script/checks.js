const Fs = require('fs')
const Filehound = require('filehound')
const Path = require('path')
const jsonFile = require('jsonfile')
const path = require('path')
const _ = require('underscore')

// check if results.json exists, and if so, clear it
let checks = "../data/json/pluginChecks.json"
if(Fs.existsSync(checks)){
  Fs.unlinkSync(checks)
  console.log("Previous pluginChecks.json file deleted.")
}

const exts = ['md','json']
const files = Filehound.create()
    .paths('../data/downloads')
    .ext(exts)
    .find();

async function initialChecks() {
    jsonObj = {}
    const filePath = await files
    filePath.forEach(file => {
        obj = {}

        // name of org/repo
        const orgRepo = Path.basename(Path.dirname(file)).replace('_','/')
        const orgRepoFile = Path.basename(Path.dirname(file)).replace('_','/')+"/"+path.basename(file)
        obj["org/repo"] = orgRepo

        // file name.ext
        obj["file"] = path.basename(file)
        
        // github url
        obj["url"] = "https://github.com/"+orgRepo

        // is file found ?
        const content = Fs.readFileSync(file, 'utf8')
        if ("404: Not Found" == content) {
            obj["status"] = 404
            obj["content"] = "null"
        } else {
            obj["status"] = 200
            if (0 == content.length) {
                obj["content"] = "zero_char"
            } else {
                obj["content"] = "nonzero_char"
            }
        }

        // add to top-level object
        jsonObj[orgRepoFile] = obj
        // console.log(obj)

    });
    
    // Run secondary checks once initial checks have been completed
    secondaryChecks()
}

async function secondaryChecks() {
    // recheck for READMEs under different common files names/extensions
    var failed = _.where(jsonObj, {"status": 404})
    console.log("Failed to find files:",failed)

    // Write JSON object to file once all additional checks have been completed
    doWriteFile()
}

function doWriteFile() {
    var json = Object.values(jsonObj)
    jsonFile.writeFileSync("../data/json/pluginChecks.json", json, {flag: 'a', EOL: ',', finalEOL: false})
    console.log("All check results formatted as JSON data. See pluginChecks.json for details.")
}

initialChecks()
