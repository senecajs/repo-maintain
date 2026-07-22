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
    const checkHeaders = checkNames.map((name, i) =>
      `<th class="sortable" data-col="${6 + i}" title="${name}">${name.replace(/_/g, ' ')} <span class="sort-icon">↕</span></th>`
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
    .table-wrap { padding: 0 32px 32px; }
    /* Dark mode scrollbar */
    .table-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .table-scroll::-webkit-scrollbar-track { background: #161b22; border-radius: 4px; }
    .table-scroll::-webkit-scrollbar-thumb { background: #30363d; border-radius: 4px; }
    .table-scroll::-webkit-scrollbar-thumb:hover { background: #58a6ff; }
    .table-scroll::-webkit-scrollbar-corner { background: #161b22; }
    .table-scroll { overflow-x: auto; overflow-y: auto; max-height: calc(100vh - 280px); border: 1px solid #30363d; border-radius: 6px; }
    table { min-width: max-content; width: 100%; border-collapse: collapse; font-size: 13px; }
    td, th { white-space: nowrap; padding: 8px 12px; }
    thead tr th { position: sticky; top: 0; z-index: 10; background: #161b22; }
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
    <div class="table-scroll">
    <table id="reportTable">
      <thead>
        <tr>
          <th class="sortable" data-col="0">Plugin <span class="sort-icon">↕</span></th>
          <th class="sortable" data-col="1">Language <span class="sort-icon">↕</span></th>
          <th class="sortable" data-col="2">Stars <span class="sort-icon">↕</span></th>
          <th data-col="3">PR Status</th>
          <th class="sortable" data-col="4">Open PRs <span class="sort-icon">↕</span></th>
          <th class="sortable" data-col="5">Branch <span class="sort-icon">↕</span></th>
          ${checkHeaders}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    </div>
  </div>

  <script>
    let currentTab = 'all'

    function setTab(tab, el) {
      currentTab = tab
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
      el.classList.add('active')
      filterTable()
    }

    let sortCol = -1
    let sortDir = 1

    function sortTable(col) {
      if (sortCol === col) {
        sortDir *= -1
      } else {
        sortCol = col
        sortDir = 1
      }
      document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc')
        const icon = th.querySelector('.sort-icon')
        if (icon) icon.textContent = '↕'
      })
      const activeTh = document.querySelector('th.sortable[data-col="' + col + '"]')
      if (activeTh) {
        activeTh.classList.add(sortDir === 1 ? 'sort-asc' : 'sort-desc')
        const icon = activeTh.querySelector('.sort-icon')
        if (icon) icon.textContent = sortDir === 1 ? '↑' : '↓'
      }
      const tbody = document.querySelector('#reportTable tbody')
      const rows = Array.from(tbody.querySelectorAll('tr'))
      rows.sort((a, b) => {
        const aCell = a.querySelectorAll('td')[col]
        const bCell = b.querySelectorAll('td')[col]
        if (!aCell || !bCell) return 0
        let aVal = aCell.textContent.trim()
        let bVal = bCell.textContent.trim()
        if (col === 2 || col === 4) {
          aVal = parseInt(aVal.replace(/[^0-9]/g, '')) || 0
          bVal = parseInt(bVal.replace(/[^0-9]/g, '')) || 0
          return (aVal - bVal) * sortDir
        }
        if (aVal === '✅' || aVal === '❌') {
          return (aVal === bVal ? 0 : aVal === '✅' ? -1 : 1) * sortDir
        }
        return aVal.localeCompare(bVal) * sortDir
      })
      rows.forEach(r => tbody.appendChild(r))
    }

    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => sortTable(parseInt(th.dataset.col)))
    })

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
