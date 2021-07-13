# seneca-cockroach-store

### Seneca node.js data-storage plugin for CockroachDB.

This module is a plugin for the Seneca framework. It provides a
storage engine that uses CockroachDB to persist data. This module is for production use.
It also provides an example of a document-oriented storage plugin code-base.

The Seneca framework provides an
[ActiveRecord-style data storage API](http://senecajs.org/data-entities.html).
Each supported database has a plugin, such as this one, that
provides the underlying Seneca plugin actions required for data
persistence.


### Support

If you're using this module, feel free to contact me on twitter if you
have any questions! :) [@colmharte](http://twitter.com/colmharte)


Tested on: Node 0.10.38, Seneca 0.6.1



### Quick example

```JavaScript
var seneca = require('seneca')()
seneca.use('cockroach-store',{
  uri:'https://127.0.0.1:8080'
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

If using self signed certs and you're seeing 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' errors then you can disable the verification checks using the line below. Add this line before connecting to the Cockroach DB.

NOTE: This should only be done in a development environment, for production you should ensure you certificate keychain has all relevant certs.

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

## Install

```sh
npm install seneca
npm install seneca-cockroach-store
```


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

As with all seneca stores, you can access the native driver, in this case,
the `roachjs` `client` object using `entity.native$(function(err,collection){...})`.


## Test

```bash
cd test
mocha cockroach.test.js --seneca.log.print
```
