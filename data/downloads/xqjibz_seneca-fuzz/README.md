## seneca-fuzztester

### A 'fuzz' testing plugin for the [Seneca Toolkit](http://senecajs.org)

This module provides a method to [fuzz test](http://en.wikipedia.org/wiki/Fuzz_testing) various plugins.

### Support/Contributions

Please use the [issues tracker](https://github.com/xqjibz/seneca-fuzz/issues) of this git repository.
Contributions will be accepted via a pull request, with an accompanying issue if appropriate.

### Examples/Usage

Using mocha/chai, a full example can be found in the [test/fuzz-integration.js]()

```js
var seneca = require('seneca')()
seneca.use('fuzztester')


describe('fuzz test from seneca', function(){
    it('should return an object with the counts inside', function(done){
        seneca.act({role:'fuzztester', cmd:'fuzz'}, function(err, results){
            expect(err).to.be.null
            expect(results).to.be.an('object')
            expect(results.totalIterations).to.be.a('number')
            expect(results.totalErrors).to.be.a('number')
            expect(results.totalSuccess).to.be.a('number')
            expect(results.totalIterations).to.equal(results.totalErrors)
            expect(results.totalSuccess).to.equal(0)
            done()
        })
    })
})
```

### Options

Objects that would have string keys, have a minimum length of 1
This uses the [random-ext](https://www.npmjs.com/package/random-ext). More detailed documentation may be found there.

`argsLength` The maximum arguments to pass into the plugin to be tested. Default : 8

`testTime` Time in seconds to run the tests. Default : 60

`arrayMax` Array length maximum. Default : 20

`arrayMin` Array length minimum. Default : 0

`integerMin` Integer minimum value. Default : 0

`integerMax` Integer maximum value. Default : 1000

`floatMax` Float maximum value. Default : 1000

`floatMin` Float minimum value. Default : 0

`dateEnd` Ending, or maximum Date. Default : new Date() // right now

`dateStart` Starting, or minimum Date. Default : the epoch, Jan 1, 1970, 00:00:00 UTC

`stringMax` Maximum length of a string. Default : 20

`stringMin` Minimum length of a strong. Default : 0

`objectMax` Object properties maximum length. Default : 8

`objectMin` Object properties minimum length. Default : 0


### testing
```sh
npm test
```
