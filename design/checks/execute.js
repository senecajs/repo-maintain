// SUGGESTION - DESIGN OUTLINE

let Checks = require('./checks')


let checkfuncs = makeCheckFuncs()


// For each plugin:

async function runChecks() {
  let results = []
  for(checkname in Checks) {
    let checkspec = Checks[checkname]
    checkspec.name = checkname
    console.log('\n\nCHECK', checkname, checkspec)

    let checkfunc = checkfuncs[checkspec.kind]
    if(null == checkfunc) {
      console.log('WARNING', 'check function does not exist', checkname, checkspec.kind)
      continue
    }

    // maybe read in file here so it only read once
    
    let res = await checkfunc(checkspec)
    console.log('RES', res)

    results.push(res)
  }
  return results
  
}



async function run() {
  let results = await runChecks()
  console.log('\n\nRESULTS', results)
}



run()


function makeCheckFuncs() {
  return {
    file_exist: async function(checkspec) {
      // read in file and do check
      return {
        pass: false,
        why: 'failure-code',
        check: checkspec.name,
        kind: checkspec.kind,
        file: checkspec.file,
      }
    },
    
    content_contain: async function(checkspec) {
      return {
        pass: false,
        why: 'failure-code',
        check: checkspec.name,
        kind: checkspec.kind,
        file: checkspec.file,
      }
    },
  }
}
