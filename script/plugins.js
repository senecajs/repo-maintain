const Fs = require('fs')

// idempotency

plugins = {
  "senecajs/seneca-transport" : {"kind":"plugin"},
  "Istar-Eldritch/seneca-sequelize" : {"kind":"plugin"},
  "senecajs-attic/seneca-pubsub" : {"kind":"plugin"},
  "chico/seneca-perm-editor" : {"kind":"plugin"},
  "timugz/seneca-token" : {"kind":"plugin"},
  "voxgig/seneca-promisify" : {"kind":"plugin"},
  "senecajs/seneca-parambulator" : {"kind":"plugin"},
  "rjrodger/seneca-todo-flex" : {"kind":"plugin"},
  "senecajs-labs/seneca-import-csv" : {"kind":"plugin"},
  "GlenTiki/seneca-load-balancer" : {"kind":"plugin"},
  "salmanm/seneca-calendar-flex" : {"kind":"plugin"}
}

json = JSON.stringify(plugins)
Fs.writeFileSync('../data/json/plugins.json', json)
console.log("Plugin list formatted to JSON. See plugins.json for data.")