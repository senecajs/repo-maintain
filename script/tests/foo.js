module.exports = {
  testLog: async function (...arg) {
    if ('silent' == arg[0]) {
      // there is param silent
      console.log = function () {}
    }

    // no params
    console.log('foo')
  },
  testPrint: async function () {
    console.log('testPrint')
  },
}
