/**
 * for each subdir in dir downloads:
 *      create json object
 *      read README.md
 *          does it match "404: Not Found" ?
 *              flag it as needing a check
 *          is file empty (> 0 char)?
 *              mark as ok or empty
 *      read package.json
 *          does it match "404: Not Found" ?
 *              flag it as needing a check
 *          is file empty (> 0 char)?
 *              mark as ok or empty
 *      append json object to top level json object? that process anyway
 * 
 * -- flags/marks to be in json format --
 */

const Fs = require('fs')
const Filehound = require('filehound');
const Path = require('path')
const jsonFile = require('jsonfile')

const exts = ['md','json']
const files = Filehound.create()
    .paths('../data/downloads')
    .ext(exts)
    .find();

async function doChecks() {
    jsonObj = {}
    const filePath = await files
    filePath.forEach(file => {
        obj = {}

        // name of org/repo
        const orgRepo = Path.basename(Path.dirname(file)).replace('_','/')
        obj["org/repo"] = orgRepo

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
        jsonObj[orgRepo] = obj
        console.log(obj)
    });

    var json = Object.values(jsonObj)
    jsonFile.writeFileSync("../data/json/pluginChecks.json", json, {flag: 'a', EOL: ',', finalEOL: false})
    console.log("All check results formatted as JSON data. See pluginChecks.json for details.")
}

doChecks()
