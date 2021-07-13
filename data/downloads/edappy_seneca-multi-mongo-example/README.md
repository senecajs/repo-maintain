# Multi-tenanted Mongo using Seneca Mongo Data Store

This is a quick example of using [Seneca.js](http://senecajs.org) with [seneca-mongo-store](https://github.com/rjrodger/seneca-mongo-store) to push data to more than one database.
It uses the zone part of a Seneca entity namespace to achieve this, following the documentation linked below.

## Usage

`index.js` assumes the existence of two databases on `localhost:27017` - `test` and `test2`.

``
node index.js
``

 * [seneca-mongo-store](https://github.com/rjrodger/seneca-mongo-store)
 * [Understanding Data Entities](http://senecajs.org/tutorials/understanding-data-entities.html)
 * [senecajs.org](http://senecajs.org/)


