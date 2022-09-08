// External modules
const minimist = require('minimist')

// Internal modules
const { search } = require('./script/search')
const { filter } = require('./script/filter')
const { runChecks } = require('./script/run-checks')
const { createReport } = require('./script/create-report')

repoMaintain()

async function repoMaintain() {
  // Command line argument parsing
  let args = minimist(process.argv.slice(2), {
    boolean: ['min', 'quiet'],
    string: ['exclChecks', 'inclChecks'],
    default: { min: false, quiet: false, exclChecks: [], inclChecks: [] },
    alias: { m: 'min', q: 'quiet', x: 'exclChecks', i: 'inclChecks' },
  })

  global.short = args.min
  if (args.quiet) console.log = function () {}

  let checkArgs = {}
  if ('string' == typeof args.exclChecks) {
    checkArgs.exclChecks = args.exclChecks.split(',')
  }
  if ('string' == typeof args.inclChecks) {
    checkArgs.inclChecks = args.inclChecks.split(',')
  }

  // Running scripts
  let searchResults = await search()
  checkArgs.Plugins = await filter(searchResults)
  let checkResults = await runChecks(checkArgs)
  await createReport(checkResults)

  console.info(
    'Process complete. See REPORT files for details - available in Markdown and CSV formats.\n'
  )
}
