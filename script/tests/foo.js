testLog('silent')
async function testLog(...arg) {
  if ('silent' == arg[0]) {
    // there is param silent
    console.log = function () {}
  }

  // no params
  console.log('hellO tHere')
}
