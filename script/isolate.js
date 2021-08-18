const Fs = require('fs')
const _ = require('underscore')

const filter = require('../data/json/filter.json')

async function doIsolate() {
  console.log("ITEMS : ", filter.length)
}

doIsolate()
