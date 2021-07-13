# seneca-orient-store

OrientDB database layer for Seneca framework

Current Version: 1.0.0

Tested on: Node 0.10.36, Seneca 0.6.1

## Install

```
npm install seneca-orient-store [--save]
```

## Tests

Prerequisites:

* Must have [OrientDB](http://www.orientechnologies.com/orientdb/) installed.
* You need to create a couple of classes in OrientDB for the tests to run. (FOO, MOON_BAR AND PRODUCT)
    * How you install OrientDB will depict how you create these classes.

To Run the tests, yopu'll need to update `test/orient.test.js` with your OrientDB password, then it's as simple as:

```
npm install
npm test
```

### Setting up classes when installed with Homebrew

```
orientdb start
orientdb-console
connect remote:localhost/senecatest root <password>
create class foo
create class moon_bar
create class product
```

## TODO

* OrientDB (or the [oriento](https://www.npmjs.com/package/oriento) module) does not convert Arrays and Objects back into their types when retrieving information from the data store. Currently, the module checks if the field is a string and tries to coerce it back to it's type using `JSON.parse()`, however, this is very unperformant as we're having to try/catch the result. OrientDB should support Arrays and Objects (from my understanding of their docs) so figure out why they're not getting stored/converted properly.
* Add jshint linting.
* Mock out the need for OrientDB in the tests so that they can run from Travis.

## Acknowledgements

This project was sponsored by [nearForm](http://nearform.com).

## License

This project is published under the [MIT license](LICENSE.md)

