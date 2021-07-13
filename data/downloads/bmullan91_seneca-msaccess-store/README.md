# seneca-msaccess-store

[![Join the chat at https://gitter.im/bmullan91/seneca-msaccess-store](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bmullan91/seneca-msaccess-store?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Based on seneca-mysql-store, seneca-oracle-store and seneca-sybase-store.

This project uses odbc to connect to Microsoft Access. Currently the odbc driver options for OSX/Linux to communicate to Microsoft Access are [grim](http://stackoverflow.com/questions/5742322/connecting-to-access-database-from-linux), therefore this module will only work in a Windows enviroment.

Tested on:

- node@0.10.26
- seneca@0.6.1 

## Prerequisites

- node v0.10.x - breaking changes in v0.11 and up with the odbc module; [issue](https://github.com/w1nk/node-odbc/issues/79)
  - [nvm for windows](https://github.com/coreybutler/nvm-windows) is convenient
- [git for windows](http://git-scm.com/download/win)
  - use git bash for windows!
- [Microsoft Access drivers](http://www.microsoft.com/en-us/download/details.aspx?id=13255)
- Specfic libraries requried for node-gyp
  - [Python 2.7.3](https://www.python.org/downloads/)
  - Microsoft Visual Studio C++ 2012 for Windows Desktop [Express version works well](http://go.microsoft.com/?linkid=9816758)
- 64-bit build's of node require [.net 64 bit SDK](http://www.microsoft.com/en-us/download/details.aspx?id=8279)


## Install

With npm:

`npm install seneca-msaccess-store`

## Usage

```js

var seneca = require('seneca')();

/*
 * Connection options
 * For information on access odbc connection strings:
 * https://www.connectionstrings.com/access/
 */

//using a connection string
seneca.use('msaccess-store', {
  connection: 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=w:\\seneca-msaccess-store\\test\\TestDB.accdb;'
});

//or pass the connection details as an object
seneca.use('msaccess-store', {
  connection: {
    driver: '{Microsoft Access Driver (*.mdb, *.accdb)}',
    dbPath: 'w:\\seneca-msaccess-store\\test\\TestDB.accdb',
    user: '',
    password: ''
  }
});

/**
 * Pool options
 * For more information on its options see https://github.com/coopernurse/node-pool
 */
seneca.use('msaccess-store', {
  connection: {
    driver: '{Microsoft Access Driver (*.mdb, *.accdb)}',
    dbPath: 'w:\\seneca-msaccess-store\\test\\TestDB.accdb',
    user: '',
    password: ''
  },
  pool: {
    min: 1,
    max: 10,
    log: true,
    idleTimeoutMillis: 10000 // specifies how long a resource can stay idle in pool before being removed
  }
});

/**
 * Creating and saving an 'apple' entity
 */

seneca.ready(function(){
  var apple = seneca.make$('fruit')
  apple.name  = 'Pink Lady'
  apple.price = 0.99
  apple.save$(function(err,apple){
    console.log( "apple.id = "+apple.id  )
  })
})

```

## TODO

- Tidy up entityFactory
- Sql, sort and limit tests from seneca store tests
- Native tests, specific to ms access

## Acknowledgements

[nearForm](http://www.nearform.com/)

