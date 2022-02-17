const { search } = require('./script/search')
const { filter } = require('./script/filter')
const { runChecks } = require('./script/runChecks')
const { createReport } = require('./script/createReport')

repoMaintain()

async function repoMaintain() {
  if (2 < process.argv.length && 'silent' == process.argv[2]) {
    console.log = function () {}
  }

  let searchResults = await search()
  let Plugins = await filter(searchResults)
  let checkResults = await runChecks(Plugins)
  await createReport(checkResults)

  console.info(
    'Process complete. See REPORT files for details - available in Markdown and CSV formats.'
  )
}
