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

  exist_codeconduct: { 
    kind:'file_exist', 
    file:'CODE_OF_CONDUCT.md' 
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
  },

  content_codeconduct: { 
    kind:'content_contain_string', 
    file:'CODE_OF_CONDUCT.md',
    contains: ['version 2.1', 'https://www.contributor-covenant.org/version/2/1/']
  },
}



