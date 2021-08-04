![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] dynamo-store management plugin.

# @seneca/dynamo-store
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Maintainability][codeclimate-badge]][codeclimate-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter][gitter-badge]][gitter-url]


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Description

This module is a plugin for
the [Seneca framework](http://senecajs.org). It provides a set of
common dynamo-store management actions (`register`, `login` etc.).


# NOTE: WORK IN PROGRESS


## Install

```sh
npm install seneca
npm install seneca-promisify // dependency
npm install seneca-entity // dependency
npm install @seneca/dynamo-store
npm install aws-sdk
```

### Quick example



```js
const Seneca = require('seneca')

var seneca = Seneca()
  .use('promisify')
  .use('entity')
  .use('dynamo-store')
```

### Detailed Examples


<!--START:action-list-->
<!--END:action-list-->

<!--START:action-desc-->
<!--END:action-desc-->



## License

Copyright (c) 2010-2020, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.org/senecajs/seneca-dynamo-store.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-dynamo-store
[coveralls-badge]: https://coveralls.io/repos/github/senecajs/seneca-dynamo-store/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-dynamo-store?branch=master
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/404faaa89a95635ddfc0/maintainability
[codeclimate-url]: https://codeclimate.com/github/senecajs/seneca-dynamo-store/maintainability
[npm-badge]: https://img.shields.io/npm/v/@seneca/dynamo-store.svg
[npm-url]: https://npmjs.com/package/@seneca/dynamo-store
[david-badge]: https://david-dm.org/senecajs/seneca-dynamo-store.svg
[david-url]: https://david-dm.org/senecajs/seneca-dynamo-store
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[Senecajs org]: https://github.com/senecajs/
