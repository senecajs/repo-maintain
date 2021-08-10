#! /usr/bin/env node

// console.log("Thanks for creating a plugin")
// console.log(process.argv)

// const [ nodeExec, scriptPath, command, ...names] = process.argv
// const thanks = "Thanks for creating a plugin"
// // console.log(names)
// if (command === '--by') {
//     console.log(thanks,names.join(', '))
// } else {
//     console.log(thanks)
// }

const [ nodeExec, scriptPath, command, names] = process.argv
const thanks = "Thanks for creating a plugin"
if (command === '--author') {
    console.log(thanks,names,"!")
} else {
    console.log(thanks,"!")
}
// it's not taking the two into account
if (command === '--plugin') {
    console.log("Time to test",names)
} else {
    console.log("Time to test your plugin")
}