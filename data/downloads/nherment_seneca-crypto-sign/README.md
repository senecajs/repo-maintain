
[![Build Status](https://api.travis-ci.org/nherment/seneca-crypto-sign.png?branch=master)](https://travis-ci.org/nherment/seneca-crypto-sign)

seneca plugin to sign objects

### install

```
  npm install --save seneca
  npm install --save seneca-crypto-sign
```

### usage


The is a default hmac signing mechanism which derives a secret key from options.key
It uses the hashing algorithm ```sha256```.

```
seneca.use( 'crypto-sign' )

var payload = {...}

var crypto = seneca.pin({role: 'crypto-sign', cmd: '*'})

crypto.sign({data: payload}, function(err, signedData) {

  signedData.type     // 'hmac' by default
  signedData.token    // the signature
  signedData.payload  // the data that was signed

})

crypto.verify({data: signedData}, function(err, verified) {
  verified // true | false
})
```

### key

It is possible to pass a custom secret key:

```
crypto.sign({data: payload, key: 'xyz'}, function(err, signedData) {
  ...
})

crypto.verify({data: payload, key: 'xyz'}, function(err, verified) {
  ...
})
```

### custom microservice


Declare a custom microservice:

```
    crypto.configure({name: 'myCustomHmacService', type: 'hmac', key: 'super duper secret', algorithm: 'sha1'}, function(err) {
      ...
    })
```


Use private/public keys:

```
    crypto.configure({name: 'myCustomRsaService', type: 'rsa', pem: <private or public key>, algorithm: 'sha256'}, function(err) {
      ...
    })
```


You can use your own even if it is password protected:

```
    crypto.configure({name: 'myCustomRsaService', type: 'rsa', pem: <private or public key>, password: 'secret', algorithm: 'sha256'}, function(err) {
      ...
    })
```

note that the 'pem' field can also receive a public key. In this case, the service can only verify data but cannot sign
it. It allows to separate instances that know the private key (eg. firewall protected authentication provider) from
those that only verify the data (public web services) and thus reduce your attack surface.
