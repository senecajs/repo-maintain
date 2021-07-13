# seneca-PBKDF2-user
[![Build Status](https://travis-ci.org/piccoloaiutante/seneca-PBKDF2-user.png?branch=master)](https://travis-ci.org/piccoloaiutante/seneca-PBKDF2-user)
## A [Seneca](http://senecajs.org) plugin for supporting PbkDf2 password encryption. 

This module is a plugin for the Seneca framework. It based on [seneca-user](https://github.com/rjrodger/seneca-user) from [Richard Rodger](https://github.com/rjrodger) adding the support of PBKDF2 algorithm for password hashing. This plugin is sponsored by [nearForm](http://www.nearform.com).

It basically overwrite the following two seneca-user command, in order to change the algorithm for password hashing:

   * encrypt_password
   * verify_password

In order to use it,  include it after seneca-user:

```JavaScript

seneca.use(require('seneca-user'));
seneca.use(require('seneca-PBKDF2-user'));
```

## Test

```sh
cd test
mocha user.test.js --seneca.log.print
