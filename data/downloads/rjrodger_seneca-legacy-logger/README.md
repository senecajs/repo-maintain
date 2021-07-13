![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> A [Seneca.js][] plugin that provides backwards compatible logging
> for Seneca 3.x

# seneca-legacy-logger
Seneca plugin 

[![npm version][npm-badge]][npm-url]
[![Dependency Status][david-badge]][david-url]
[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

This plugin is included by default in Seneca 2.x.

**NOTE**: This plugin will not be included by default in Seneca 3.x
  and above, and will need to be installed manually.

(Seneca 3.x is due for release late July 2016).

## Installation
This is needed only for Seneca 3.x and above.

```sh
npm install seneca-legacy-logger
```

And in your code:

```js
require('seneca')({
  internal: {logger: require('seneca-legacy-logger')}
})
```


## Contributing

The [Senecajs org][] encourages open participation. If you feel you
can help in any way, be it with documentation, examples, extra
testing, or new features please get in touch.


## License
Copyright (c) 2016, Richard Rodger and other contributors.
Licensed under [MIT][].

[MIT]: ./LICENSE
[npm-badge]: https://badge.fury.io/js/seneca-legacy-logger.svg
[npm-url]: https://badge.fury.io/js/seneca-legacy-logger
[Senecajs org]: https://github.com/senecajs/
[Seneca.js]: https://www.npmjs.com/package/seneca
[@senecajs]: http://twitter.com/senecajs
[senecajs.org]: http://senecajs.org/
[travis-badge]: https://travis-ci.org/rjrodger/seneca-legacy-logger.svg
[travis-url]: https://travis-ci.org/rjrodger/seneca-legacy-logger
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/rjrodger/seneca-legacy-logger
[github issue]: https://github.com/rjrodger/seneca-legacy-logger/issues
[david-badge]: https://david-dm.org/rjrodger/seneca-legacy-logger.svg
[david-url]: https://david-dm.org/rjrodger/seneca-legacy-logger

