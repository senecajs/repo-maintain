![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] plugin for generic membership relations between entities.

# seneca-member
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter][gitter-badge]][gitter-url]


NOTE: requires underlying entity store to support "value array" queries.


## Install

```sh
$ npm install seneca-promisify seneca-member
```


## Quick Example

```
const Seneca = require('seneca')

Seneca()
    .use('member')
    .act({
      role: 'member',
      cmd: 'add',
      parent:'p001', 
      child:'c001', 
      kind:'group', 
      code:'admin', 
      tags:['foo','bar']
    },
    function(err, out) {
      console.log(out)
    })
```


## Usage

* For message validation,
  load [seneca-doc](github.com/voxgig/seneca-doc)
  and [seneca-joi](github.com/voxgig/seneca-joi)



<!--START:action-list-->


## Action Patterns

* [add:kinds,role:member](#-addkindsrolemember-)
* [add:member,role:member](#-addmemberrolemember-)
* [get:kinds,role:member](#-getkindsrolemember-)
* [is:member,role:member](#-ismemberrolemember-)
* [list:children,role:member](#-listchildrenrolemember-)
* [list:parents,role:member](#-listparentsrolemember-)
* [list:all,role:member](#-listallrolemember-)
* [remove:member,role:member](#-removememberrolemember-)
* [role:member,update:member](#-rolememberupdatemember-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `add:kinds,role:member` &raquo;

Add parent and child entity types.


#### Parameters


* _kinds_ : object


----------
### &laquo; `add:member,role:member` &raquo;

Add child (id) to parent (id) under relationship `kind` (idempotent).


#### Parameters


* _parent_ : string <i><small>{presence:required}</small></i>
 : Parent entity identifier.
* _child_ : string
 : Child entity identifier.
* _kind_ : string <i><small>{presence:required}</small></i>
* _code_ : string
* _tags_ : array
* _children_ : array
 : Child entity identifiers (optional).


----------
### &laquo; `get:kinds,role:member` &raquo;

No description provided.



----------
### &laquo; `is:member,role:member` &raquo;

No description provided.



----------
### &laquo; `list:children,role:member` &raquo;

No description provided.


#### Parameters


* _parent_ : string
* _child_ : string
* _kind_ : string
* _code_ : string
* _tags_ : array


----------
### &laquo; `list:parents,role:member` &raquo;

No description provided.


#### Parameters


* _parent_ : string
* _child_ : string
* _kind_ : string
* _code_ : string
* _tags_ : array


----------
### &laquo; `list:all,role:member` &raquo;

No description provided.



----------
### &laquo; `remove:member,role:member` &raquo;

No description provided.



----------
### &laquo; `role:member,update:member` &raquo;

No description provided.


#### Parameters


* _parent_ : string
 : Parent entity identifier.
* _child_ : string
 : Child entity identifier.
* _kind_ : string
* _code_ : string
* _tags_ : array
* _id_ : string <i><small>{presence:required}</small></i>


----------


<!--END:action-desc-->



## License

Copyright (c) 2019-2020, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.org/senecajs/seneca-member.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-member
[npm-badge]: https://img.shields.io/npm/v/@seneca/member.svg
[npm-url]: https://npmjs.com/package/@seneca/member
[david-badge]: https://david-dm.org/senecajs/seneca-member.svg
[david-url]: https://david-dm.org/senecajs/seneca-member
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[coveralls-badge]: https://coveralls.io/repos/github/senecajs/seneca-member/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-member?branch=master
[Senecajs org]: https://github.com/senecajs/
