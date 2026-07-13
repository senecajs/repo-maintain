module.exports = {
  createHTML: async function (checkResults) {
    const Fs = require('fs')

    const plugins = Object.values(checkResults)
    const total = plugins.length
    const passed = plugins.filter(p => Object.values(p.checks).every(c => c.pass)).length
    const failed = total - passed

    const getOwner = (fullName) => {
      if (fullName.startsWith('senecajs/')) return 'official'
      if (fullName.startsWith('luiz-justino/')) return 'fork'
      return 'community'
    }

    const officialPassed = plugins.filter(p =>
      getOwner(p.data.full_name) === 'official' &&
      Object.values(p.checks).every(c => c.pass)
    ).length

    const forkPassed = plugins.filter(p =>
      getOwner(p.data.full_name) === 'fork' &&
      Object.values(p.checks).every(c => c.pass)
    ).length

    const communityPassed = plugins.filter(p =>
      getOwner(p.data.full_name) === 'community' &&
      Object.values(p.checks).every(c => c.pass)
    ).length

    const officialTotal = plugins.filter(p => getOwner(p.data.full_name) === 'official').length
    const forkTotal = plugins.filter(p => getOwner(p.data.full_name) === 'fork').length
    const communityTotal = plugins.filter(p => getOwner(p.data.full_name) === 'community').length

    const forkStatusCell = (data) => {
      if (data.fork_status === 'merged') {
        return '<div class="fork-status"><a href="' + (data.fork_pr_url || '#') + '" target="_blank">✅ #' + data.fork_pr_number + '</a><span class="tip">Merged by Richard</span></div>'
      } else if (data.fork_status === 'pr_open') {
        return '<div class="fork-status"><a href="' + (data.fork_pr_url || '#') + '" target="_blank">⏳ #' + data.fork_pr_number + '</a><span class="tip">Open — awaiting review</span></div>'
      } else {
        return '<div class="fork-status">➖<span class="tip">Not started yet</span></div>'
      }
    }

        const rows = plugins.map(plugin => {
      const checks = Object.values(plugin.checks)
      const allPass = checks.every(c => c.pass)
      const checkCells = checks.map(c =>
        `<td class="${c.pass ? 'pass' : 'fail'}">${c.pass ? '✅' : '❌'}</td>`
      ).join('')

      const owner = getOwner(plugin.data.full_name)
      const badgeLabel = owner === 'official' ? 'official' : owner === 'fork' ? 'fork' : 'community'

      return `
        <tr class="${allPass ? 'row-pass' : 'row-fail'}" data-owner="${owner}">
          <td><a href="${plugin.data.html_url}" target="_blank">${plugin.data.full_name}</a><span class="badge badge-${owner}">${badgeLabel}</span></td>
          <td>${plugin.data.language || 'N/A'}</td>
          <td>⭐ ${plugin.data.stargazers_count}</td>
          <td>${forkStatusCell(plugin.data)}</td>
          <td>${plugin.data.open_prs > 0 ? plugin.data.open_prs : '—'}</td>
          <td>${plugin.data.default_branch}</td>
          ${checkCells}
        </tr>`
    }).join('')

    const checkNames = plugins[0] ? Object.keys(plugins[0].checks) : []
    const checkHeaders = checkNames.map(name =>
      `<th title="${name}">${name.replace(/_/g, ' ')}</th>`
    ).join('')

    const generated = new Date().toUTCString()

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seneca Plugin Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d1117; color: #c9d1d9; }
    header { background: #161b22; padding: 24px 32px; border-bottom: 1px solid #30363d; }
    header h1 { font-size: 24px; color: #f0f6fc; }
    header p { color: #8b949e; margin-top: 4px; font-size: 13px; }
    .stats { display: flex; gap: 16px; padding: 24px 32px; flex-wrap: wrap; }
    .stat { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px 24px; text-align: center; }
    .stat .number { font-size: 32px; font-weight: bold; }
    .stat .label { font-size: 12px; color: #8b949e; margin-top: 4px; }
    .stat.total .number { color: #58a6ff; }
    .stat.pass .number { color: #3fb950; }
    .stat.fail .number { color: #f85149; }
    .stat.official .number { color: #79c0ff; }
    .stat.fork .number { color: #56d364; }
    .stat.community .number { color: #d2a8ff; }
    .tab-bar { display: flex; gap: 6px; padding: 0 32px 16px; flex-wrap: wrap; }
    .tab { background: #161b22; border: 1px solid #30363d; color: #8b949e; padding: 7px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; user-select: none; }
    .tab:hover { border-color: #58a6ff; color: #c9d1d9; }
    .tab.active { background: #1f6feb; border-color: #1f6feb; color: #fff; }
    .tab .count { background: rgba(255,255,255,0.15); border-radius: 10px; padding: 1px 7px; font-size: 11px; margin-left: 6px; }
    .controls { padding: 0 32px 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    input[type="search"] { background: #161b22; border: 1px solid #30363d; color: #c9d1d9; padding: 8px 12px; border-radius: 6px; font-size: 14px; width: 300px; }
    select { background: #161b22; border: 1px solid #30363d; color: #c9d1d9; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
    .table-wrap { padding: 0 32px 32px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { background: #161b22; color: #8b949e; padding: 10px 8px; text-align: left; border-bottom: 1px solid #30363d; white-space: nowrap; position: sticky; top: 0; }
    td { padding: 8px; border-bottom: 1px solid #21262d; vertical-align: middle; }
    td a { color: #58a6ff; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    td.pass { text-align: center; }
    td.fail { text-align: center; }
    tr:hover td { background: #161b22; }
    .row-pass td:first-child { border-left: 3px solid #3fb950; }
    .row-fail td:first-child { border-left: 3px solid #f85149; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 500; margin-left: 8px; vertical-align: middle; }
    .badge-official { background: #1f3d5c; color: #79c0ff; }
    .badge-fork { background: #1a3326; color: #56d364; }
    .badge-community { background: #2d2033; color: #d2a8ff; }
    .hidden { display: none; }
    /* Fork status */
    .fork-status { position: relative; cursor: default; display: inline-block; }
    .fork-status .tip { display: none; position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%); background: #1c2128; border: 1px solid #30363d; border-radius: 6px; padding: 4px 10px; font-size: 11px; white-space: nowrap; color: #c9d1d9; z-index: 99; }
    .fork-status:hover .tip { display: block; }
    .legend { display: flex; align-items: center; gap: 16px; padding: 12px 32px 14px; flex-wrap: wrap; font-size: 12px; color: #8b949e; border-bottom: 1px solid #21262d; margin-bottom: 8px; }
    .legend strong { margin-right: 4px; }
  </style>
</head>
<body>
  <header>
    <h1>🔍 Seneca Plugin Report</h1>
    <p>Generated on ${generated} · ${total} plugins analyzed</p>
  </header>

  <div class="stats">
    <div class="stat total"><div class="number">${total}</div><div class="label">Total Plugins</div></div>
    <div class="stat pass"><div class="number">${passed}</div><div class="label">Passing</div></div>
    <div class="stat fail"><div class="number">${failed}</div><div class="label">Failing</div></div>
    <div class="stat official"><div class="number">${officialPassed}/${officialTotal}</div><div class="label">Official passing</div></div>
    <div class="stat fork"><div class="number">${forkPassed}/${forkTotal}</div><div class="label">Forks passing</div></div>
    <div class="stat community"><div class="number">${communityPassed}/${communityTotal}</div><div class="label">Community passing</div></div>
  </div>

  <div class="tab-bar">
    <div class="tab active" onclick="setTab('all', this)">All <span class="count">${total}</span></div>
    <div class="tab" onclick="setTab('official', this)">Official (senecajs/*) <span class="count">${officialTotal}</span></div>
    <div class="tab" onclick="setTab('fork', this)">Forks in review (luiz-justino/*) <span class="count">${forkTotal}</span></div>
    <div class="tab" onclick="setTab('community', this)">Community <span class="count">${communityTotal}</span></div>
  </div>

  <div class="legend">
    <strong>PR Status:</strong>
    ✅ Merged by Richard &nbsp;|&nbsp;
    ⏳ Open — awaiting review &nbsp;|&nbsp;
    ➖ Not started
  </div>
  <div class="controls">
    <input type="search" id="search" placeholder="Search plugins..." oninput="filterTable()">
    <select id="statusFilter" onchange="filterTable()">
      <option value="all">All</option>
      <option value="pass">Passing only</option>
      <option value="fail">Failing only</option>
    </select>
  </div>

  <div class="table-wrap">
    <table id="reportTable">
      <thead>
        <tr>
          <th>Plugin</th>
          <th>Language</th>
          <th>Stars</th>
          <th>PR Status</th>
          <th>Open PRs</th>
          <th>Branch</th>
          ${checkHeaders}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>

  <script>
    let currentTab = 'all'

    function setTab(tab, el) {
      currentTab = tab
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
      el.classList.add('active')
      filterTable()
    }

    function filterTable() {
      const search = document.getElementById('search').value.toLowerCase()
      const status = document.getElementById('statusFilter').value
      document.querySelectorAll('#reportTable tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase()
        const isPass = row.classList.contains('row-pass')
        const owner = row.dataset.owner
        const matchSearch = text.includes(search)
        const matchStatus = status === 'all' || (status === 'pass' && isPass) || (status === 'fail' && !isPass)
        const matchTab = currentTab === 'all' || owner === currentTab
        row.classList.toggle('hidden', !matchSearch || !matchStatus || !matchTab)
      })
    }
  </script>
</body>
</html>`

    Fs.writeFileSync('index.html', html)
    console.log('HTML report generated: index.html')
  }
}
