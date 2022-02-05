// console.log('\n\n#######       REPO_MAINTAIN       #######\n\n')
const { search } = require('./search')
const { filter } = require('./filter')
const { runChecks } = require('./runChecks')
const { createReport } = require('./createReport')

repoMaintain()
async function repoMaintain() {
  console.log('\n\n#######       Search       #######\n\n')
  let searchResults = await search()

  console.log('\n\n#######       Filter       #######\n\n')
  let Plugins = await filter(searchResults)

  console.log('\n\n#######       checkResults       #######\n\n')
  let checkResults = await runChecks(Plugins)

  console.log('\n\n#######       PRE CREATE REPORT       #######\n\n')
  let Report = await createReport(checkResults)
  console.log('\n\n#######       POST CREATE REPORT       #######\n\n')
}
