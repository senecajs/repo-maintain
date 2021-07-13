# seneca-ldap-store

### Seneca node.js data-storage plugin for LDAP

This is a plugin for the [Seneca framework](http://senecajs.org/). It provides a storage engine
that uses LDAP.

The Seneca framework provides an [ActiveRecord-style data storage API](http://senecajs.org/data-entities.html). 
Each supported database has a plugin, such as this one, that
provides the underlying Seneca plugin actions required for data
persistence.

### Support
If you're using this module, feel free to contact me on twitter if you
have an questions [@gangleri_](http://twitter.com/gangleri_)

Current Version: [![NPM version](https://badge.fury.io/js/seneca-ldap-store.png)](http://badge.fury.io/js/seneca-ldap-store) 

[![build status](https://secure.travis-ci.org/gangleri/seneca-ldap-store.png)](http://travis-ci.org/gangleri/seneca-ldap-store)
[![Dependency Status](https://david-dm.org/gangleri/seneca-ldap-store.png)](https://david-dm.org/gangleri/seneca-ldap-store)
[![DevDependency Status](https://david-dm.org/gangleri/seneca-ldap-store/dev-status.png)](https://david-dm.org/gangleri/seneca-ldap-store#info=devDependencies&view=table)

### Quick example
```JavaScript
var seneca = require('seneca')()
seneca.use('ldap-store', {
  url: 'ldap://127.0.0.1:1389',
  password: 'secret',
  dn: 'cn=root'
})

seneca.ready(function(){
  var user = seneca.make$('dev')
  user.dn  = 'cn=foo, ou=users, o=example'
  user.objectClass= 'unixUser'
  user.save$(function(err, user){
    console.log( "user.id = " + user.id  )
  })
})
```


### Install
```sh
npm install seneca-ldap-store
```

### Test
```sh
npm test
```
