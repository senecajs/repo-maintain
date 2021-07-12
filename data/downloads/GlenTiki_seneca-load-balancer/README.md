![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
# A [Seneca.js][] service load balancer that allows you to run multiple instances of services listening for the same pattern.

# Seneca-load-balancer

### IN PROGRESS, NOT PROD READY

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter chat][gitter-badge]][gitter-url]

This is a plugin for Seneca that allows you to load balance between multiple
running instances of your services. This allows you to build what appears to be
the evolving standard for microservices (run as many as needed of the same service
at once to meet demand, load balance between them). This only works with http
and tcp transports.

 - lead maintainer: [Glen Keane][lead]

## Example

At the end of this example, you will have seen how to run some services, hook your
load-balancer to them, and then the load balancer will send out jobs to them from
some client. The client sends all acts to the load-balancer, the load-balancer
then sends acts to a running service, and the service gets a reply from the client.

The service/server below (service.js) is run with the command `node math.js SOME_PORT`,
allowing you to create the same service listening on multiple ports.

```javascript
var seneca = require('seneca')()

// A basic pattern to use
seneca.add({ a: 1 }, function (input, done) {
  console.log(input)
  done(null, { b: 1, port: process.argv[2] })
})

// eg. run with node ./test.js 10201
seneca.listen({ port: process.argv[2] })
```

The code below (balancer.js) is how you would setup your customised load-balancer. You just
`.use()` the load-balancer, and supply it with some options/config. I will supply
`SOME_LOAD_BALANCE_CONFIG_OBJECT` later.

```javascript
var Seneca = require('seneca')()
var SOME_LOAD_BALANCE_CONFIG_OBJECT = {...}

seneca.use(require('seneca-load-balancer'), SOME_LOAD_BALANCE_CONFIG_OBJECT)

seneca.listen({port: 10100})
```

The code below (client.js) is an example of a client that wants to use our already defined
service. This client connects to our load-balancer, NOT the services themselves.

```javascript
var seneca = require('seneca')()

seneca.client({ port: 10100, pin: {} })

setInterval(function () {
  seneca.act({ a: 1 }, console.log)
}, 10000)
```

If you ran service.js three times, you need some way of connecting to it.
e.g if you ran the following:
```bash
node ./service.js 10201
node ./service.js 10202
node ./service.js 10203
```

now run the client. this will try every ten seconds to hit our currently running
service, and log the result. when it starts getting replies with the `b` and `port`
property, we know we succeeded
```bash
node ./client.js
```

Now, we need the balancer to connect our client to our services. This is where
the config object mentioned above comes in. This object has a specific stucture,
explained in full later. however, for this example, the following config works:
```javascript
var config = {
  services: [
    {
      //we can use seneca pattern style definitions here, or standard objects!
      pattern: 'a:1',
      locations: [
        { host: 'localhost', port: '10201', spec: 'http' },
        { host: 'localhost', port: '10202', spec: 'http' },
        { host: 'localhost', port: '10203', spec: 'http' }
      ]
    }
  ]
}
```

now, with the config above, run `./balancer.js` with the following:
```bash
node ./balancer.js
```

## Contributing

This module follows the general [Senecajs org][senecaOrg] contribution guidelines, and encourages open participation. If you feel you can help in any way, or discover any Issues, feel free to [create an issue][issue] or [create a pull request][pr]!

If you wish to read more on our guidelines, feel free to

  - Checkout the concise [contribution file][contrib]
  - Checkout our much more indepth [contributing guidelines][contribGuide]

## License
Copyright Glen Keane and other contributors 2016, Licensed under [MIT][].

[Seneca.js]: https://www.npmjs.com/package/seneca
[senecaOrg]: https://github.com/senecajs/
[issue]: https://github.com/thekemkid/seneca-load-balancer/issues
[pr]:https://github.com/thekemkid/seneca-load-balancer/pulls
[MIT]: ./LICENSE
[contrib]: ./CONTRIBUTING.md
[contribGuide]: http://senecajs.org/contribute/
[npm-badge]: https://img.shields.io/npm/v/seneca-load-balancer.svg
[npm-url]: https://npmjs.com/package/seneca-load-balancer
[travis-badge]: https://api.travis-ci.org/thekemkid/seneca-load-balancer.svg
[travis-url]: https://travis-ci.org/thekemid/seneca-load-balancer
[david-badge]: https://david-dm.org/thekemid/seneca-load-balancer.svg
[david-url]: https://david-dm.org/thekemid/seneca-load-balancer
[gitter-badge]: https://badges.gitter.im/senecajs/seneca.svg
[gitter-url]: https://gitter.im/senecajs/seneca

[lead]: https://github.com/thekemkid
