// THIS IS TO BE USED
module.exports = {
  exist_readme: {
    kind:'file_exist',
    file:'README.md'
  },
  exist_pkgjson: { kind:'file_exist', file:'package.json' },
  exist_license: { kind:'file_exist', file:'LICENSE' },
  content_readme: { kind:'content_contain', file:'README.md', contains:'Voxgig' },
}



