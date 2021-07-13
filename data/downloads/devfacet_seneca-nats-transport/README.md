# seneca-nats-transport

[![NPM][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coverage-image]][coverage-url]

Seneca NATS transport.

[Seneca](http://senecajs.org/) is a microservices framework and [NATS](http://nats.io/) is 
an open-source, high-performance, lightweight cloud messaging system. This library provides
a publish-subscribe message distribution model.

## Installation

```bash
npm install seneca-nats-transport
```

## Usage

[gnatsd server](http://nats.io/download/) **should** be running.

```javascript
// server.js

require('seneca')()
  .use('nats-transport')
  .add({role: 'foo', cmd: 'bar'}, function(msg, done) { return done(null, msg); })
  .listen({type:'nats'});
```

```javascript
// client.js

require('seneca')()
  .use('nats-transport')
  .client({type:'nats'})
  .act({role: 'foo', cmd: 'bar', arg1: 1, arg2: 2}, console.log);
```

```javascript
// nats.js

require('nats').connect().subscribe('*', function(msg) {
  console.log(msg);
});
```

```bash
gnatsd
node nats.js
node server.js
node client.js
```

## License

Licensed under The MIT License (MIT)  
For the full copyright and license information, please view the LICENSE.txt file.

[npm-url]: http://npmjs.org/package/seneca-nats-transport
[npm-image]: https://badge.fury.io/js/seneca-nats-transport.svg

[travis-url]: https://travis-ci.org/devfacet/seneca-nats-transport
[travis-image]: https://travis-ci.org/devfacet/seneca-nats-transport.svg?branch=master

[coverage-url]: https://coveralls.io/github/devfacet/seneca-nats-transport?branch=master
[coverage-image]: https://coveralls.io/repos/github/devfacet/seneca-nats-transport/badge.svg?branch=master
