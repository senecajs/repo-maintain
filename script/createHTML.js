module.exports = {
  createHTML: async function (checkResults) {
    const Fs = require('fs')

    const plugins = Object.values(checkResults)
    const total = plugins.length
    const passed = plugins.filter(p => Object.values(p.checks).every(c => c.pass)).length
    const failed = total - passed

    const rows = plugins.map(plugin => {
      const checks = Object.values(plugin.checks)
      const allPass = checks.every(c => c.pass)
      const checkCells = checks.map(c =>
        `<td class="${c.pass ? 'pass' : 'fail'}">${c.pass ? '✅' : '❌'}</td>`
      ).join('')

      return `
        <tr class="${allPass ? 'row-pass' : 'row-fail'}">
          <td><a href="${plugin.data.html_url}" target="_blank">${plugin.data.full_name}</a></td>
          <td>${plugin.data.language || 'N/A'}</td>
          <td>⭐ ${plugin.data.stargazers_count}</td>
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
    .stats { display: flex; gap: 16px; padding: 24px 32px; }
    .stat { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px 24px; text-align: center; }
    .stat .number { font-size: 32px; font-weight: bold; }
    .stat .label { font-size: 12px; color: #8b949e; margin-top: 4px; }
    .stat.total .number { color: #58a6ff; }
    .stat.pass .number { color: #3fb950; }
    .stat.fail .number { color: #f85149; }
    .controls { padding: 0 32px 16px; display: flex; gap: 12px; align-items: center; }
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
    .hidden { display: none; }
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
    function filterTable() {
      const search = document.getElementById('search').value.toLowerCase()
      const status = document.getElementById('statusFilter').value
      document.querySelectorAll('#reportTable tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase()
        const isPass = row.classList.contains('row-pass')
        const matchSearch = text.includes(search)
        const matchStatus = status === 'all' || (status === 'pass' && isPass) || (status === 'fail' && !isPass)
        row.classList.toggle('hidden', !matchSearch || !matchStatus)
      })
    }
  </script>
</body>
</html>`

    Fs.writeFileSync('index.html', html)
    console.log('HTML report generated: index.html')
  }
}