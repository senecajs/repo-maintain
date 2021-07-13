# seneca mail db template - Node.js module

## A Node.js extension for seneca-mail plugin - this can be used with seneca toolkit

### Seneca toolkit very short intro

Seneca is a toolkit for organizing the business logic of your app. You
can break down your app into "stuff that happens", rather than
focusing on data models or managing dependencies.

For a gentle introduction to this module, see the [senecajs.org](http://senecajs.org) site.

### Seneca-mail plugin short intro

This module is a plugin for the Seneca framework. It provides email capability for actions.
For more details about using this plugin please visit [seneca-mail](https://github.com/rjrodger/seneca-mail)

### Module details

This module is used to override the generateBody action from seneca-mail default implementation. By using this module the
email body/subject are loaded from DB.

The collection/table from which the template is loaded is 'template'. By using the seneca entity store we can separate the
DB engine API details from this module implementation. The only things that must be mentioned is that:

  * collection/table name: template
  * table structure (in case of SQL DB engine)
    * type: 'mail' - string
    * templateName - string
    * body - string
    * subject - string - optional, if not present then the subject set when seneca-mail action is executed will be used.

Body and subject are considered EJS templates and will be rendered using ejs.

This module can be an example about re-writing the seneca action generateBody action if default provided functionality is not enough.

Please make sure to load this module AFTER loading seneca-mail plugin.

#### Example of using the seneca-mail and seneca-mail-dbtemplate plugins

```JavaScript
var seneca = require('seneca')()

seneca.use('mail',{
  mail: {
    from: 'help@example.com'
  },
  config:{
    service: "Gmail",
    auth: {
      user: "help@example.com",
      pass: "PASSWORD"
    }
  }
})

seneca.use('seneca-mail-dbtemplate')

seneca.ready(function(err){
  console.log('ola')
  if( err ) return console.log(err);

  seneca.act({
    role:'mail',
    cmd:'send',
    code:'welcome',
    to:'customer1@example.com',
    subject:'Welcome!'
  })
})
```


If you're using this module, feel free to contact me on twitter if you
have any questions! :) [@Alexandru_M](https://twitter.com/Alexandru_M)
