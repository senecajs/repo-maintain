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

const Filehound = require('filehound');

const exts = ['md','json']
const files = Filehound.create()
    .paths('../data/downloads')
    .ext(exts)
    .find();

async function doChecks() {
    // how can I access these outside of this single promise ?
    files.then(console.log)
}

doChecks()
