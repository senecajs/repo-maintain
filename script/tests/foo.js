const Fs = require('fs')

// console.log("Empty file:",Fs.readFileSync('../../data/txt/empty.txt', 'utf8'))
// console.log("Two-line file:",Fs.readFileSync('../../data/txt/2lines.txt', 'utf8'))

const empty = Fs.readFileSync('../../data/txt/empty.txt', 'utf8')
const full = Fs.readFileSync('../../data/txt/2lines.txt', 'utf8')

if (0 == empty.length) {
    console.log("such file, much empty")
} else{
    console.log("huh, empty no empty")
}

if (0 == full.length) {
    console.log("full file! is empty!!")
} else{
    console.log("file full, much appreciate")
}