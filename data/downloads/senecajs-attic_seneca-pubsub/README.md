
![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] pubsub plugin.

# seneca-pubsub
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter][gitter-badge]][gitter-url]

A decoration that adds pub sub via [Varo][] to [Seneca][]


If you're using this module, and need help, you can:

- Post a [github issue][],
- Tweet to [@senecajs][],
- Ask on the [Gitter][gitter-url].

If you are new to Seneca in general, please take a look at [senecajs.org][]. We have
everything from tutorials to sample apps to help get you up and running quickly.


## Install
This plugin, simply use npm,

```sh
npm install seneca
npm install seneca-pubsub
```

## Test
To run tests, simply use npm:

```sh
npm run test
```

## Quick Example

```js

var seneca = require('seneca')()
seneca.use(require('seneca-pubsub'))

seneca.subscribe({role: 'foo'}, function (msg) {
  console.log(msg.data.value)    
})

seneca.subscribe({role: 'foo'}, function (msg) {
  console.log(msg.data.value)    
})

seneca.publish({role: 'foo', data: {value: 10}})
seneca.publish({role: 'foo', data: {value: 10}})
seneca.publish({role: 'foo', data: {value: 10}})

// Output x6: '10'
```

## Contributing
The [Senecajs org][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License
Copyright (c) 2015, Dean McDonnell and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[npm-badge]: https://img.shields.io/npm/v/seneca-pubsub.svg
[npm-url]: https://npmjs.com/package/seneca-pubsub
[Seneca]: https://github.com/senecajs/seneca
[Varo]: https://github.com/senecajs/varo
[Senecajs org]: https://github.com/senecajs/
[Seneca.js]: https://www.npmjs.com/package/seneca
[@senecajs]: http://twitter.com/senecajs
[senecajs.org]: http://senecajs.org/
[travis-badge]: https://api.travis-ci.org/senecajs/seneca-pubsub.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-pubsub
[coveralls-badge]:https://coveralls.io/repos/senecajs/seneca-pubsub/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-pubsub?branch=master
[david-badge]: https://david-dm.org/senecajs/seneca-pubsub.svg
[david-url]: https://david-dm.org/senecajs/seneca-pubsub
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[github issue]: https://github.com/senecajs/seneca-pubsub/issues
