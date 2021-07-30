const { script } = require("googleapis/build/src/apis/script");

// THIS IS TO BE USED
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
    contains: {
      level1:'scripts',
      level2:'test'
    },
    content_type:'key'
  }
}



