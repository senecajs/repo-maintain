const Fetch = require('node-fetch')

testFetch()
async function testFetch() {
  let url =
    'https://raw.githubusercontent.com/' +
    'senecajs/seneca-gateway' +
    '/master/' +
    'package.json'

  console.log('URL : ', url)
  const fileRaw = await Fetch(url)
  console.log('fileRaw : ', fileRaw)
  console.log('fileRawOK : ', fileRaw.ok)
  console.log('fileRawSTATUS : ', fileRaw.status)
  let fileContent = await fileRaw.text()
  console.log('fileContent : ', fileContent)
}
