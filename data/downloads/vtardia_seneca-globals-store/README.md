# seneca-globals-store

### Seneca node.js data-storage plugin for Globals DB.

This module is a plugin for the Seneca framework. It provides a
storage engine that uses MongoDB to persist data.

The Seneca framework provides an
[ActiveRecord-style data storage API](http://senecajs.org/data-entities.html).
Each supported database has a plugin, such as this one, that
provides the underlying Seneca plugin actions required for data
persistence.

### Support

Current Version: 1.1.0

Tested on: Node 0.10.33, Seneca 0.6.1

### Quick example

```JavaScript
var seneca = require('seneca')()
seneca.use('globals-store',{
  path:'/globals/db/root/dir'
})

seneca.ready(function(){
  var apple = seneca.make$('fruit')
  apple.name  = 'Pink Lady'
  apple.price = 0.99
  apple.save$(function(err,apple){
    console.log( "apple.id = "+apple.id  )
  })
})
```

## Install

```sh
npm install seneca
npm install seneca-globals-store
```

Install GlobalsDB by following this [Quickstart Guide](http://globalsdb.org/quickstart).


## Usage

You don't use this module directly. It provides an underlying data storage engine for the Seneca entity API:

```JavaScript
var entity = seneca.make$('typename')
entity.someproperty = "something"
entity.anotherproperty = 100

entity.save$( function(err,entity){ ... } )
entity.load$( {id: ...}, function(err,entity){ ... } )
entity.list$( {property: ...}, function(err,entity){ ... } )
entity.remove$( {id: ...}, function(err,entity){ ... } )
```


### Queries

The standard Seneca query format is supported:

   * `entity.list$({field1:value1, field2:value2, ...})` implies pseudo-query `field1==value1 AND field2==value2, ...`
   * you can only do AND queries. That's all folks. Ya'll can go home now. The Fat Lady has sung.
   * `entity.list$({f1:v1,...},{sort$:{field1:1}})` means sort by field1, ascending
   * `entity.list$({f1:v1,...},{sort$:{field1:-1}})` means sort by field1, descending
   * `entity.list$({f1:v1,...},{limit$:10})` means only return 10 results
   * `entity.list$({f1:v1,...},{skip$:5})` means skip the first 5
   * `entity.list$({f1:v1,...},{fields$:['field1','field2']})` means only return the listed fields (avoids pulling lots of data out of the database)
   * you can use sort$, limit$, skip$ and fields$ together


### Native Driver

As with all seneca stores, you can access the native driver, in this case, the `globals.Cache` `db` object using `entity.native$(function(err,db){...})`. For more information read the [Official Globals DB Node.js API guide](http://globalsdb.org/misc/api-docs/nodejs/Node.js%20Interface%20-%20User%20Guide%20-%20e1.6%20-%20v2013.2.0.350.x.pdf).


## Test

```bash
export GLOBALS_HOME=/path/to/globalsdb/root/dir
npm test
```
