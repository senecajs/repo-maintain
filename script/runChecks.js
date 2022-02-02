module.exports = {
  Checks: function () {
    // Node modules
    const Fs = require('fs')
    const Path = requires('path')

    // External modules
    const Filehound = require('filehound')
    const Hoek = require('@hapi/hoek')
    const Marked = require('marked')

    // Internal modules
    const { checkList } = require('../design/checks/checks')
    const defineChecks = checkOperations()

    async function runChecks(config) {}

    async function runChecksPrep(config) {}

    runAll()

    async function runAll() {}

    async function configDef() {} // this will become redundant

    // no need for conclusion() - it's only console output

    function checkOperations() {}
  },
}
