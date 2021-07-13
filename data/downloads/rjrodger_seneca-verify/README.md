seneca-verify
=============

Verify standard set of seneca plugins against seneca version 0.5.19.

See [seneca Node.js module](http://senecajs.org)

## Pre-release

$ rm -rf node_modules
$ npm install
$ rm -rf node_modules/seneca
$ ln -s ../../seneca node_modules
$ node verify.js


## Post-release

$ rm -rf node_modules
$ npm install
$ node verify.js

