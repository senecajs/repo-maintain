 /**
   * "if" clauses here only deal with SenecaJS repos (accept/reject list)
   * json.items.forEach(maybe => {
   *  if (maybe["owner"]["login"] == "senecajs"){
   *   add maybe to relevant (formatted as json)
   *  }
   *  if x then y etc etc
   * })
   */

const Fs = require('fs')

/**
 * I think this is CAUSING an ERROR "unexpected token in JSON"
 * Possibly to do with either
 *  "Tokenization is skipped for long lines for performance reasons.
 *    The length of a long line can be configured via 
 *    editor.maxTokenizationLineLength."
 * or
 *  "results.json: For performance reasons, document symbols have been
 *    limited to 5000 items. Use setting 'json.maxItemsComputed' to
 *    configure the limit."
*/

const results = JSON.parse("../data/json/results.json")


// check if relevant.json exists, and if so, clear it
let relevant = "../data/json/relevant.json"
if(Fs.existsSync(relevant)){
  Fs.unlinkSync(relevant)
  console.log("Previous relevant.json file deleted.")
}

async function doFilter() {
  // read json file
  console.log(results.length)
  
  Fs.appendFileSync("../data/json/relevant.json", JSON.stringify(json.items))
}