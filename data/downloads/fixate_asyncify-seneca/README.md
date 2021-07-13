## asyncify-seneca

Adds async methods for seneca.

### Methods

`addAsync(def, generator)` - uses `co` to handle the generator function.

`actAsync(def)` - uses `bluebird.promisify`, returns a promise.

### Usage

```javascript
const asyncifySeneca = require('seneca-asyncify');
const seneca = require('seneca');

const s = asyncifySeneca(seneca)
  .use(...);

s.addAsync('role:sms,cmd:send', function*(args) => {
  const result = yield someAsyncThing();
  yield s.actAsync('role:email,cmd:send')
    .catch((err) => /*handle error*/);
  return { done: true, result: result };
});
```

## TODO

`actAsync` could just return a thunk so that we can remove the `bluebird` dep.
