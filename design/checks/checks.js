module.exports = {

  exist_readme: {
    kind:'file_exist',
    file:'README.md'
  },
  
  exist_pkgjson: { 
    kind:'file_exist', 
    file:'package.json' 
  },

  exist_license: { 
    kind:'file_exist', 
    file:'LICENSE' 
  },
  
  content_readme: { 
    kind:'content_contain_string', 
    file:'README.md', 
    contains:'Voxgig'
  },

  content_pkgjson: {
    kind:'content_contain_json',
    file:'package.json',
    contains: ['scripts', 'test'],
    content_type:'key'
  }
}



