![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] plugin

# seneca-calendar-flex

[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

[![js-standard-style][standard-badge]][standard-style]

## install

To install, simply use npm. Remember you will need to install [Seneca.js][] if you haven't already.

```sh
> npm install seneca
> npm install seneca-calendar-flex
```


## usage

```js
var Seneca = require('seneca')
var SenecaCalendarFlex = require('seneca-calendar-flex')

var seneca = Seneca().use(SenecaCalendarFlex, {})

seneca.ready(function () {
  // access plugin features
})
```


## test

To run tests, simply use npm:

```sh
> npm run test
```


[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.org/senecajs/seneca-calendar-flex.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-calendar-flex
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[standard-badge]: https://raw.githubusercontent.com/feross/standard/master/badge.png
[standard-style]: https://github.com/feross/standard
