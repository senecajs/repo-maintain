# seneca-kv
[Seneca](senecajs.org) plugin providing messages for a generic key-value store.

[![Npm][BadgeNpm]][Npm]
[![Travis][BadgeTravis]][Travis]
[![Coveralls][BadgeCoveralls]][Coveralls]



## Quick Example

```
Seneca()
  .use('kv')
  .act('role:kv,cmd:set,key:foo,val:bar', function() {
    this.act('role:kv,cmd:get,key:foo', function(ignore, out) {
      console.log(out.val) // prints 'bar'
    })
  })
```


## Inbound Messages

* `role:kv,cmd:set`; params: `key`: string, `val`: object
* `role:kv,cmd:get`; params: `key`: string
* `role:kv,cmd:del`; params: `key`: string


## Implementations

* Self: transient memory store
* Redis: [`seneca-redis-kv`](https://github.com/voxgig/seneca-redis-kv)


[BadgeCoveralls]: https://coveralls.io/repos/voxgig/seneca-kv/badge.svg?branch=master&service=github
[BadgeNpm]: https://badge.fury.io/js/seneca-kv.svg
[BadgeTravis]: https://travis-ci.org/voxgig/seneca-kv.svg?branch=master
[Coveralls]: https://coveralls.io/github/voxgig/seneca-kv?branch=master
[Npm]: https://www.npmjs.com/package/seneca-kv
[Travis]: https://travis-ci.org/voxgig/seneca-kv?branch=master
