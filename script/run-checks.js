module.exports = {
  runChecks: async function ({
    Plugins,
    exclChecks = [],
    inclChecks = [],
  } = {}) {
    // External modules
    const { defineChecks } = require('@seneca/maintain')

    // Internal modules
    const { gatherData } = require('./gather-data')

    console.log('\nChecks function initiated.\n')
    let allResults = {}
    for (let i = 0; i < Plugins.length; i++) {
      let item = Plugins[i]
      let results = {}
      let plugin = await gatherData(item, exclChecks, inclChecks)
      // console.log(plugin)
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
        let res = null
        if (
          checkDetails.include[0].test(
            plugin.data.org_name.concat('/', plugin.data.package_name)
          ) &&
          !checkDetails.exclude[0].test(
            plugin.data.org_name.concat('/', plugin.data.package_name)
          )
        ) {
          res = await checkKind(checkDetails, plugin.data)
        } else {
          continue
        }
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
    console.log(
      '\nChecks complete. \nRemoved packages without package.json files. \n' +
        Object.keys(allResults).length +
        ' items sent for formatting.'
    )
    return allResults
  },
}
