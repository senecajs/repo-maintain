auth-restrict-login
====================

[Seneca](http://senecajs.org) plugin for restrict login.

This plugin can used by [seneca-auth](https://www.npmjs.com/package/seneca-auth)

For a gentle introduction to Seneca itself, see the [senecajs.org](http://senecajs.org) site.

### Install

```sh
npm install seneca-auth-restrict-login
```

### Using restrict login plugin

When using seneca-auth with auth-restrict-login:

```
..........
seneca.use('auth')
seneca.use('auth-restrict-login', options)
..........

```

