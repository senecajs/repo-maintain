Fs = require('fs')

console.log("Empty file:",Fs.readFileSync('../../data/txt/empty.txt', 'utf8'))
console.log("Two-line file:",Fs.readFileSync('../../data/txt/2lines.txt', 'utf8'))