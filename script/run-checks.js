module.exports = {
  runChecks: async function (Plugins) {
    // Node modules
    const Path = require('path')

    // External modules
    const Hoek = require('@hapi/hoek')
    const Marked = require('marked')
    const { defineChecks } = require('@seneca/maintain')
    const { checkList } = require('@seneca/maintain')

    // Internal modules
    const { gatherData } = require('./gather-data')

    console.log('\nChecks function initiated.\n')
    let allResults = {}
    for (let i = 0; i < Plugins.length; i++) {
      let item = Plugins[i]
      let results = {}
      let plugin = await gatherData(item, checkList())
      console.log(
        '[',
        i + 1,
        ' of ',
        Plugins.length,
        ']',
        plugin.data.full_name
      )
      for (checkName in plugin.checks) {
        let checkDetails = plugin.checks[checkName]
        checkDetails.name = checkName

        let checkKind = defineChecks()[checkDetails.kind]
        if (null == checkKind) {
          console.info(
            'WARNING',
            'Check does not exist',
            checkName,
            checkDetails.kind
          )
          continue
        }
        let res = await checkKind(checkDetails, plugin.data)
        results[checkName] = res
      }
      // Filtering out those without package.json files
      if (results.exist_pkgjson.pass) {
        allResults[item.full_name] = {
          data: plugin.data,
          checks: results,
        }
      }
    }
    console.log('Checks complete.')
    return allResults
  },
}
