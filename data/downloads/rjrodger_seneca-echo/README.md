# seneca-echo - a [Seneca](http://senecajs.org) plugin


## Seneca echo plugin. 

This Seneca plugin provides a simple echo service. It is used as a
test case and provides a simple example of a plugin. Cut and paste to
create your own plugins!

For a gentle introduction to Seneca itself, see the
[senecajs.org](http://senecajs.org) site.


### Support

Current Version: 0.3.0

Tested on: [Seneca](//github.com/rjrodger/seneca) 0.6.2

[![Build Status](https://travis-ci.org/rjrodger/seneca-echo.png?branch=master)](https://travis-ci.org/rjrodger/seneca-echo)

Built and tested against versions: `0.10, 0.11, 0.12, iojs`

[Annotated Source](http://rjrodger.github.io/seneca-echo/doc/echo.html)

If you're using this module, and need help, you can:

   * Post a [github issue](//github.com/rjrodger/seneca-echo/issues),
   * Tweet to [@senecajs](http://twitter.com/senecajs),
   * Ask on the [![Gitter chat](https://badges.gitter.im/rjrodger/seneca-echo.png)](https://gitter.im/rjrodger/seneca-echo).


### Install

```sh
npm install seneca-echo
```


### Quick example

```
require('seneca')()
  .use('echo')  // the seneca- prefix is optional
  .act('role:echo,foo:bar', function(err,out) {
    console.log(out.foo) // prints bar
  })
```


### Development & Test

To test, use:

```sh
npm test
```


