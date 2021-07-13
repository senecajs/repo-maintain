
[![Build Status](https://api.travis-ci.org/nherment/seneca-salestax.png?branch=master)](https://travis-ci.org/nherment/seneca-salestax)

# seneca-salestax

## A sales tax calculation plugin for the [Seneca](http://senecajs.org) toolkit

This module is a plugin for the Seneca framework. It provides business logic for sales tax calculation, such as:

   * tax rate resolution based on country, region, category or any configurable system
   * tax rate calculation


## Quick example

```JavaScript

    var seneca = require('seneca')()
    seneca.use('salestax', {
       country: {
         FR: 0.196,
         UK: {
           '*': 0.20, // this is a wildcard used if no category is specified
           category: {
             energy: 0.05,
             child: 0.05,
             food: 0
           }
         },
         IE: {
           category: {
             energy: 0.05,
             child: 0.05,
             food: 0,
             children_clothes: 0
           }
         }
       }
     })

    seneca.ready(function(){

      var salestaxpin = seneca.pin({role:'salestax',cmd:'*'})

      // configure your taxes and how they should apply

      salestaxpin.salestax({net: 100, country: 'FR'}, function(err, calcResult){
        console.log('total: ', calcResult.total) // 119.6
        console.log('tax: ', calcResult.tax) // 19.6
        console.log('rate: ', calcResult.rate) // 0.196
      })

      salestaxpin.salestax({net: 100, country: 'UK'}, function(err, calcResult){
        console.log('total: ', calcResult.total) // 120
        console.log('tax: ', calcResult.tax) // 20
        console.log('rate: ', calcResult.rate) // 0.20
      })

      salestaxpin.salestax({net: 100, country: 'UK', category: 'energy'}, function(err, calcResult){
        console.log('total: ', calcResult.total) // 105
        console.log('tax: ', calcResult.tax) // 5
        console.log('rate: ', calcResult.rate) // 0.05
      })

      salestaxpin.salestax({net: 100, country: 'UK', category: 'unknown'}, function(err, calcResult){
        console.log('error: ', err) // an error is returned because the category does not match a tax rate
      })
    })
```



## Install

```sh
npm install --save seneca
npm install --save seneca-salestax
```

You'll need the [seneca](http://github.com/rjrodger/seneca) module to use this module - it's just a plugin.


## Usage

To load the plugin:

```JavaScript
seneca.use('salestax', { ... options ... })
```


## Test

```sh
npm test
```
