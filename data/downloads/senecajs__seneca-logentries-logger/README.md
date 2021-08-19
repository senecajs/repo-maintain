![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](https://www.npmjs.com/package/seneca) logger for Logentries

# seneca-logentries-logger

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Coveralls][BadgeCoveralls]][Coveralls]
[![Gitter][gitter-badge]][gitter-url]


- __Lead Maintainer__: [David Gonzalez](https://github.com/dgonzalez)
- __Sponsor__: [nearForm](http://www.nearform.com)
- __node__: 4.x, 6.x

This module is a plugin that enables your Seneca-based microservice to send logs
to Logentries.

### Seneca compatibility

Supports Seneca versions **2.x** - **3.x**

## Getting Started

Here is an example on how to use the logger:
```
var Seneca = require('seneca')
var seneca = Seneca({legacy: {logging: false}, 'logentries-logger': {token: <your-token>}})
seneca.use(require('seneca-logentries-logger'))
```

And that's all! From now on, all the Seneca log output will be sent to the Logentries
log configured to the specified token.

## Configuration

In order to configure the logger there is a number of configuration parameters that
can be passed into Seneca in the key 'logentries-logger'. The parameters will
be passed straight away into the Logentries.

seneca-logentries-logger will default the values for `levels` (if not specified)
to match the naming convention for used for seneca on the log levels. However,
if you specify the attribute values, seneca-logentries-logger will respect
your configuration.

The configuration is based on the [le_node client](https://github.com/rapid7/le_node#options).

The only required attribute is `token` as shown in the above example.

## Compatibility

Seneca-logentries-logger is only compatible with Seneca 3.0+ and Node 4.x+

## Contributing

The [Senecajs org](https://www.npmjs.com/package/seneca) encourage open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License

Copyright (c) 2016, David Gonzalez and other contributors.
Licensed under [MIT](LICENSE).

[npm-url]: https://npmjs.com/package/seneca-logentries-logger
[npm-badge]: https://img.shields.io/npm/v/seneca-logentries-logger.svg
[travis-badge]: https://travis-ci.org/senecajs/seneca-logentries-logger.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-logentries-logger
[david-badge]: https://david-dm.org/senecajs/seneca-logentries-logger.svg
[david-url]: https://david-dm.org/senecajs/seneca-logentries-logger
[Coveralls]: https://coveralls.io/github/senecajs/seneca-logentries-logger?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/senecajs/seneca-logentries-logger/badge.svg?branch=master
[gitter-url]: https://gitter.im/senecajs/seneca-logentries-logger
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
