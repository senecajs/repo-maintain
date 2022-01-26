![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] data storage plugin.

# seneca-todo-flex
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

This module is a plugin for the Seneca framework. It provides todo
list business logic and is designed to be extended and enhanced for
use if your own projects.

- __Tested on:__ Seneca 0.9
- __Node:__ 0.10, 0.12, 4, 5
- __License:__ [MIT][]

seneca-todo-flex's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online](http://senecajs.org/annotations/todo-flex.html).

The annotated source can be found locally at [./doc/seneca-todo-flex.html]().

If you're using this module, and need help, you can:

- Post a [github issue][],
- Tweet to [@senecajs][],
- Ask on the [Gitter][gitter-url].

If you are new to Seneca in general, please take a look at
[senecajs.org][]. We have everything from tutorials to sample apps to
help get you up and running quickly.


## Install

```sh
npm install seneca-todo-flex
```


And in your code:

```js
require('seneca')()
  .use('todo-flex')
```

## Test
To run tests:

```sh
npm test
```


## Releases

#### 0.1.0 - 2015-12-23
- first version, provides marking

## Contributing

The [Senecajs org][] encourages open participation. If you feel you
can help in any way, be it with documentation, examples, extra
testing, or new features please get in touch.

## License
Copyright (c) 2015, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[npm-badge]: https://badge.fury.io/js/seneca-todo-flex.svg
[npm-url]: https://badge.fury.io/js/seneca-todo-flex
[Rjrodger org]: https://github.com/rjrodger/
[Seneca.js]: https://www.npmjs.com/package/seneca
[@rjrodger]: http://twitter.com/rjrodger
[rjrodger.org]: http://rjrodger.org/
[travis-badge]: https://travis-ci.org/rjrodger/seneca-todo-flex.svg
[travis-url]: https://travis-ci.org/rjrodger/seneca-todo-flex
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/rjrodger/seneca
[github issue]: https://github.com/rjrodger/seneca-todo-flex/issues


