# Not maintained

Please go to [seneca-counter-firebase](https://github.com/zrrrzzt/seneca-counter-firebase) instead


# seneca-firebase-counter
Seneca counter for firebase

Work in progress

## Usage

Start service

```javascript
'use strict'

const Seneca = require('seneca')()
const senecaFirebaseCounter = require('seneca-firebase-counter')
const senecaFirebaseCounterOptions = {
  tag: 'seneca-counter-firebase',
  apiKey: '<your-firebase-api-key>',
  authDomain: '<your-firebase-auth-domain>',
  databaseURL: '<your-firebase-database-url>',
  storageBucket: '<your-firebase-storage-bucket>'
}

Seneca.use(senecaFirebaseCounter, senecaFirebaseCounterOptions)

Seneca.listen(1337)

```

call the service to add a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"add", "key": "tfk", "value": 2}' -v http://localhost:1337/act
```

or to subtract

```sh
$ curl -d '{"role":"counter", "cmd":"sub", "key": "tfk", "value": 2}' -v http://localhost:1337/act
```
