const { search } = require('./script/search')
const { filter } = require('./script/filter')
const { runChecks } = require('./script/runChecks')
const { createReport } = require('./script/createReport')

repoMaintain()

async function repoMaintain() {
  global.short = false
  if (2 < process.argv.length) {
    if (process.argv.slice(2).includes('silent')) console.log = function () {}
    if (process.argv.slice(2).includes('short')) short = true
  }

  let searchResults = await search()
  let Plugins = await filter(searchResults)
  let checkResults = await runChecks(Plugins)
  await createReport(checkResults)

  console.info(
    'Process complete. See REPORT files for details - available in Markdown and CSV formats.'
  )
}
