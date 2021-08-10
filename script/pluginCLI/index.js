#! /usr/bin/env node

const readLine = require('readline')
// const Chalk = require('chalk')

const Rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

Rl.question("What is your name? ", function(name) {
    Rl.question("And the name of your plugin? ", function(plugin) {
        console.log(`\nHi ${name}, thanks for creating ${plugin}! Welcome aboard the Seneca team.`)
        Rl.close()
    })
})
Rl.on("close", function() {
    process.exit(0)
})