# seneca-mongoose
![node](https://img.shields.io/badge/node-v8.9.0-brightgreen.svg) ![npm](https://img.shields.io/badge/npm-v5.6.1-blue.svg) ![yarn](https://img.shields.io/badge/yarn-v1.3.2-blue.svg)  ![coverage](https://img.shields.io/badge/coverage-100%25-green.svg) ![tests](https://img.shields.io/badge/tests-8%2F8-green.svg)

## About
Mongoose storage layer for Seneca framework

## Install

```
npm install seneca-mongoose
```

## Options
  See plugin options [here](http://mongoosejs.com/docs/connections.html#options)

## Plugin Interface

```javascript
seneca.mongoose
```
 - Methods and properties list [here](http://mongoosejs.com/docs/index.html)

## Quick Example

```javascript
const Seneca = require('Seneca')
const Mongoose = require('mongoose')
const SenecaMongoose = require('seneca-mongoose')
const seneca = Seneca()
  .use(SenecaMongoose, {
    uri: 'mongodb://localhost/test',
    options: {
      autoIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    }
  }).ready((err) => {
    if (err) throw err
    const Cat = Mongoose.model('Cat', { name: String })
    const kitty = new Cat({ name: 'Zildjian' })
    kitty.save().then(() => console.log('meow'))
  })
```