seneca-engage - a [Seneca](http://senecajs.org) plugin
======================================================

Handle web visitor engagements

[![Build Status](https://travis-ci.org/rjrodger/seneca-engage.png?branch=master)](https://travis-ci.org/rjrodger/seneca-engage)


Prerequisites
-------------

seneca-engage is a [Seneca](http://senecajs.org/) plugin.  In order to use seneca-engage, you must have Seneca installed in your project.  Make sure `seneca` is a dependency in your `package.json` file, and run `npm install`

Setup
-----

Add seneca-engage to your project by adding it as a dependency in your `package.json` file:
```JSON
"dependencies": {
  ...
  "seneca-engage": "X.Y.Z",
  ...
}
```
where X, Y, and Z are the appropriate version numbers. Run `npm install` to install all of the dependencies, including seneca-engage.

Since seneca-engage is a seneca plugin, it can be registered to the seneca instance simply by adding the line

```JavaScript
seneca.use('engage');
```

Then, in order for the engage plugin and other web-plugins to be available on the server (in this case a connect server), all you need to add to the server is the seneca web middleware:

```JavaScript
var app = connect();
app.use( seneca.export('web') );
app.listen(3000);
```

The engage commands are now available via the `seneca.act()` API.  For example, to call the `get` command, with the key `'myKey'`, you could write

```JavaScript
seneca.act('role:engage, cmd:get', {key:'myKey'}, callback);
```

Alternatively, you can pin the engage role to a variable via the `seneca.pin()` API and call the commands as methods.

```JavaScript
var engagement = seneca.pin({role:'engage',cmd:'*'});
engage.get({key:'myKey'}, callback);
```

Commands
--------

### set(options, callback)
Creates a key-value pair for the current user engagement, which can be accessed later by using the `get` function.
* options `Object`
  - key `String` - identifier for value in engagement
  - value `String` `Number` `Object` - value to set, can be any type.
* callback `Function` - takes two arguements, `err` and `out`.  `out` is an object with property `token`, which stores the unique cookie token used to keep track of the user's engagement.

### get(options, callback)
Retrieves the value associated with a key in the current user engagement.
* options `Object`
  - key `String` - identifier for value in engagement
  - token `String` - used to determine the current user engagement.  token can be omitted if the `seneca-engage` plugin is being called from the request object in a server callback, since the token will be retrieved from the request object (see example).
* callback `Function` - takes two arguements, `err` and `out`.  `out` is an object with property `value`, which the value associated with the requested `key`.

Example
-------

To run the following example, copy the code into a file, (e.g. `engage.app.js`) and download the dependencies by running 
````
$ npm install seneca connect seneca-engage
```  
To run try the program, run the command `$ node engage.app.js`.  Then navigate to localhost:3000/?k=key1&v=val1 to set the enagement variable key1 to the string val1.  Then navigate to localhost:3000/?k=key1 to see the current value of key1.  Try other variable names and values, and experiment with closing and reopening the browser to see the values persist.

```Javascript
var connect = require('connect')

var seneca = require('seneca')()

seneca.use( 'engage' )

seneca.act({role:'web',use:function(req,res,next){
  var key = req.query.k
  var val = req.query.v

  if( val ) {
    req.seneca.act('role:engage,cmd:set',{key:key,value:val},respond)
  }
  else {
    req.seneca.act('role:engage,cmd:get',{key:key},respond)
  }

  function respond(err,out) {
    if( err) return next(err);

    res.writeHead(200)
    res.end('key '+key+'='+out.value)
  }

}})



var app = connect()
app.use( connect.query() )
app.use( seneca.export('web') )

app.listen(3000)
```
