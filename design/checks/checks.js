module.exports = {

  exist_readme: {
    config:'base',
    kind:'file_exist',
    file:'README.md'
  },
  
  exist_pkgjson: { 
    config:'base',
    kind:'file_exist', 
    file:'package.json' 
  },

  exist_license: { 
    config:'base',
    kind:'file_exist', 
    file:'LICENSE' 
  },

  exist_codeconduct: { 
    config:'base',
    kind:'file_exist', 
    file:'CODE_OF_CONDUCT.md' 
  },

  exist_entry: {
    config:'js',
    kind:'fileX_exist_if_contain_json',
    file:'404',
    if_file:'package.json',
    contains:['main'],
    contains_type:'key',
    contains_is_not:'index.js'
  },

  exist_dist: {
    config:'ts',
    kind:'fileX_exist_if_contain_json',
    file:'404',
    if_file:'package.json',
    contains:['main'],
    contains_type:'key',
    contains_is_not:'dist/index.js'
  },
  
  content_readme: { 
    config:'base',
    kind:'content_contain_string', 
    file:'README.md', 
    contains: ['Voxgig']
  },

  version_codeconduct: { 
    config:'base',
    kind:'content_contain_string', 
    file:'CODE_OF_CONDUCT.md',
    contains: ['version 2.1', 'https://www.contributor-covenant.org/version/2/1/']
  },

  test_pkgjson: {
    config:'base',
    kind:'content_contain_json',
    file:'package.json',
    contains: ['scripts', 'test'],
    contains_type:'key'
  }

}



