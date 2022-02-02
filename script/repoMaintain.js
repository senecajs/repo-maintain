// console.log('\n\n#######       REPO_MAINTAIN       #######\n\n')
const { search } = require('./search')
const { filter } = require('./filter')
const { runChecks } = require('./runChecks')
const { createReport } = require('./createReport')

repoMaintain()
async function repoMaintain() {
  let searchResults = await search()
  // console.log(
  //   '\n\n#######       SearchResults       #######\n\n',
  //   searchResults
  // )
  let Plugins = await filter(searchResults)
  // console.log('\n\n#######       Plugins       #######\n\n', Plugins)
  let checkResults = await runChecks(Plugins)
  // console.log('\n\n#######       checkResults       #######\n\n', checkResults)
  let Report = await createReport(checkResults)
  // console.log('\n\n#######       POST CREATE REPORT       #######\n\n')
}
