![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) data storage plugin

# seneca-postgres-store

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Coveralls][BadgeCoveralls]][Coveralls]
[![Gitter][gitter-badge]][gitter-url]

## Description

seneca-postgres-store is a [PostgreSQL][postgresqlorg] database plugin for the [Seneca][seneca] MVP toolkit. The plugin is using the [node-postgres][nodepg] driver.
For query generation it uses internally the [seneca-standard-query][standard-query] plugin and the standard functionality can be extended by using the [seneca-store-query][store-query] plugin.

Usage:

    var Seneca = require('seneca');
    var store = require('seneca-postgres-store');

    var DBConfig = {
      name: 'senecatest',
      host: 'localhost',
      username: 'senecatest',
      password: 'senecatest',
      port: 5432
    }
    ...

    var si = Seneca(DBConfig)
    si.use(require('seneca-postgres-store'), DBConfig)
    si.ready(function() {
      var product = si.make('product')
      ...
    })
    ...

### Seneca compatibility
Supports Seneca versions **1.x** - **3.x**

### Supported functionality
All Seneca data store supported functionality is implemented in [seneca-store-test](https://github.com/senecajs/seneca-store-test) as a test suite. The tests represent the store functionality specifications.

## Usage
You don't use this module directly. It provides an underlying data storage engine for the Seneca entity API:

```js
var entity = seneca.make$('typename')
entity.someproperty = "something"
entity.anotherproperty = 100

entity.save$(function (err, entity) { ... })
entity.load$({id: ...}, function (err, entity) { ... })
entity.list$({property: ...}, function (err, entity) { ... })
entity.remove$({id: ...}, function (err, entity) { ... })
```

### Query Support

The standard Seneca query format is supported. See the [seneca-standard-query][standard-query] plugin for more details.

## Extended Query Support

By using the [seneca-store-query][store-query] plugin its query capabilities can be extended. See the plugin page for more details.

## Column name transformation, backward compatibility

In seneca-postgres-store 2.0 the internal CamelCase to snake_case column names conversion was removed.

To update from seneca-postgres-store 1.x to 2.x on systems built with seneca-postgres-store 1.x you must provide to the plugin through its options the functions that do the CamelCase to snake_case conversion and back. Any other name transformations to and from database column name can be also made with these. Example:

```js
var DefaultConfig = {
...
  fromColumnName: function (attr) {
    // apply some conversion on column names
    return attr.toUpperCase()
  },
  toColumnName: function (attr) {
    // convert back column names
    return attr.toLowerCase()
  }
}
seneca.use(require('seneca-postgres-store'), DefaultConfig)
```

For a fully functional CamelCase to snake_case implementation sample please look in the postgres.test.js at the 'Column Names conversions' test code.

## Limits

By default queries are limited to 20 values. This can be bypassed by passing the `nolimit` option, which if set to true will not limit any queries.

## Fields

To filter the fields returned from the `list` operation, pass a `fields$` array of column names to return. If no `fields$` are passed, all fields are returned (i.e. `select *` is used). e.g.

    query.fields$ = ['id', 'name']


Note: The implicit id that is generated on save$ has uuid value. To override this you must provide entity.id$ with a desired value.

### Custom ID generator

To generate custom IDs it is exposed a seneca action pattern hook that can be overwritten:


```js
seneca.add({role: 'sql', hook: 'generate_id', target: <store name>}, function (args, done) {
  return done(null, {id: idPrefix + Uuid()})
})

```

### Native Driver
As with all seneca stores, you can access the native driver, in this case, the `pg`
`connection` object using `entity.native$(function (err, connectionPool, release) {...})`.
Please make sure that you release the connection after using it.

```
entity.native$( function (err, client, releaseConnection){
  // ... you can use client
  // ... then release connection
  releaseConnection()
} )
```

## Contributing
The [Senecajs org][] encourages open participation. If you feel you
can help in any way, be it with documentation, examples, extra
testing, or new features please get in touch.

## To run tests with Docker
Build the PostgreSQL Docker image:

```sh
npm run build

```

Start the PostgreSQL container:
```sh
npm run start
```

Stop the PostgreSQL container:
```sh
npm run stop
```

While the container is running you can run the tests into another terminal:
```sh
npm run test
```

#### Testing for Mac users
Before the tests can be run you must run `docker-machine env default` and copy the docker host address (example: '192.168.99.100').
This address must be inserted into the test/default_config.json file as the value for the host variable. The tests can now be run.


## License
Copyright (c) 2012 - 2016, Marian Radulescu and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[npm-badge]: https://img.shields.io/npm/v/seneca-postgres-store.svg
[npm-url]: https://npmjs.com/package/seneca-postgres-store
[travis-badge]: https://api.travis-ci.org/senecajs/seneca-postgres-store.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-postgres-store
[david-badge]: https://david-dm.org/senecajs/seneca-postgres-store.svg
[david-url]: https://david-dm.org/senecajs/seneca-postgres-store
[codeclimate-badge]: https://codeclimate.com/github/senecajs/seneca-postgres-store/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/senecajs/seneca-postgres-store
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[standard-query]: https://github.com/senecajs/seneca-standard-query
[store-query]: https://github.com/senecajs/seneca-store-query
[postgresqlorg]: http://www.postgresql.org/
[seneca]: http://senecajs.org/
[nodepg]: https://github.com/brianc/node-postgres
[Senecajs org]: https://github.com/senecajs/
[Coveralls]: https://coveralls.io/github/senecajs/seneca-postgres-store?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/senecajs/seneca-postgres-store/badge.svg?branch=master
