#seneca-template-store

Creating a new seneca datastore plug-in from scratch can involve a lot of overhead. The purpose of this project is to provide a template which can be easily modified to create your own datastore plug-in project with minimal effort.

###Set-up

 ``` *.bash
 $ git clone https://github.com/jrochenrfm/seneca-template-store.git
 $ rm -rf .git
 ```

 Now re-name the seneca-template-store folder using the datastore plug-in convention. All seneca datastore plug-ins are named seneca-\<databasename\>-store, so seneca-mongo-store for MongoDB, seneca-mysql-store for MySQL, etc.

 Re-name the plug-in module:

 `lib/data-store.js` to `lib/<databasename>-store.js`

Enter the store name within the plug-in module

``` javascript
// Enter the name of the datastore.
// This will be the name registered with seneca.
var name = '';
```

to

``` javascript
// Enter the name of the datastore.
// This will be the name registered with seneca.
var name = '<databasename>-store';
```

 Re-name the test module:

 `test/data-store.test.js` to `test/<databasename>-store.test.js`

###package.json

Fill in the package.json file with your project information:

- name
- version
- description
- main


The main attribute is required so that the test framework will run.

###Install the test framework and seneca

The devDependencies attribute and peerDependencies attributes are already completed so you can just run:

 ``` *.bash
 $ npm install
 ```

###Run tests

 ``` *.bash
 $ npm test
 ```

 The test module uses the [seneca store test](https://github.com/rjrodger/seneca-store-test) module. The test module is set-up so you can easily add extra tests for your specific datastore.

 The tests will fail but you are ready to start implementing the [datastore interface](https://github.com/rjrodger/seneca-mongo-store#usage).


###Utility functions

The underlying database needs to have a name for the table or collection associated with the database. The convention is to join the base and name with an underscore, '_'. The createCollectionName function in the plug-in module takes a seneca entity and creates the underlying database table or collection name.

``` javascript
function createCollectionName(entity)
```

###Resources

- [seneca framework](http://senecajs.org/)
- [seneca data entities](http://senecajs.org/data-entities.html)
- [seneca datastore plug-ins](http://senecajs.org/plugins.html)
