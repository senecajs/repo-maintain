# seneca-store-listen 0.1.3

Allow offline seneca stores to listen for seneca connections like regular DBs.
Uses seneca-transport.

Install:
```
npm install seneca-store-listen
```

Currently supports:
- mem-store
- jsonfile-store
- level-store

Usage:
```
db = 'jsonfile-store'
var sl = require('seneca-store-listen')()

sl.host(db, function(server_config){
  setTimeout(function(){
    seneca = seneca.client(server_config)

    // sample db usage
    seneca.make$('fruit').save$({name: 'apple'}, function (err, res) {
      if (err) console.error(err)

      seneca.make$('fruit').load$({name: 'apple'}, function (err, res) {
        if (err) console.error(err)
        console.log('res:' + res)
      })
    })
  }, 2000)
})
```