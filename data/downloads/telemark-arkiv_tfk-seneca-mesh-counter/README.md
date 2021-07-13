# tfk-seneca-mesh-counter
Microservice for live counter

## Usage
call the service to add a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"add", "key": "test", "value": 2}' -v http://localhost:8000/act
```

or to subtract a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"subtract", "key": "test", "value": 2}' -v http://localhost:8000/act
```

Lookup a key

```sh
$ curl -d '{"role":"counter", "cmd":"get", "key": "test"}' -v http://localhost:8000/act
```

returns

```JavaScript
{success: true, key: 'test', value: 0} 
```

if no key is supplied it will use ```value``` as key

## License
[MIT](LICENSE)
