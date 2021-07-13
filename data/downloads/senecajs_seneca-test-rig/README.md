![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin tester

seneca-plugin-test
=======================

[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

Seneca-plugin-test is running the Seneca from the github master branch against a group of Seneca plugins as a preliminary verification step before publishing.

## Usage
The tests are started manually from the Travis interface or are automatically triggered when a repo file is pushed or a PR is made.

### Test configuration

The `global` section of the test specifies the seneca version to be tested.
If nothing is set then the main branch is cloned and tested.
If it is set to a specific tagged version all tests are run against that specific version.

Note: the tool assumes that repos have tags for the published versions

```
Example: test all plugins against Seneca 1.3.0

env:
  global:
    - SENECA_VER=#v1.3.0
...

```

The `matrix` section specifies the plugins to be tested.
The plugin name must match the repo name from github.
The plugins must be located under the SenecaJS organization on github.

```
Example:
matrix:
  # plugins to test
  - TEST_SUITE=seneca-mem-store
  - TEST_SUITE=seneca-store-test
```

The `node_js` specifies the node versions against which the tests to be run.

```
Example:
node_js:
  - '4'
  - '5'
```

If a store plugin is tested the database must be specified as addon. Also the database version can be specified.

```
Example:

addons:
  postgresql: "9.4"

services:
  - postgresql
```

Loading a schema in the database is done in the `before_script` section. The schema must be already downloaded on the local system.

```
Example:
before_script:
  - if [ $TEST_SUITE = 'seneca-postgres-store' ]; then psql -U postgres -f seneca-postgres-store/docker/dbschema.sql ; fi
```

For more details related to Travis config file see [Building a Node.js project][travis-node].

## Running on local
Travis CI can be run also on a local docker container
The Travis Docker container can be started and stopped on your local system with

```sh
npm run start
npm run stop
```

See the official docs for more details [Travis Docker][travis-docker], [Travis Build][travis-build]

## Contributing
We encourage participation. If you feel you can help in any way, be it with
examples, extra testing, or new features please get in touch.

## License
Copyright Mihai Dima and other contributors 2016, Licensed under [MIT][].

[MIT]: ./LICENSE
[travis-badge]: https://api.travis-ci.org/senecajs-labs/seneca-plugin-test.svg
[travis-url]: https://travis-ci.org/senecajs-labs/seneca-plugin-test
[travis-node]: https://docs.travis-ci.com/user/languages/javascript-with-nodejs
[travis-docker]:https://docs.travis-ci.com/user/common-build-problems/#Troubleshooting-Locally-in-a-Docker-Image
[travis-build]:https://github.com/travis-ci/travis-build#use-as-addon-for-cli
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[seneca]: http://senecajs.org/
