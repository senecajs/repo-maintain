# seneca zookeper plugin

This plugin provices acess to zookeeper and will create, get, set, remove, and list paths.


## Example

```js
var seneca = require('seneca')()

seneca
  	.use('../zookeeper-registry', {server: '127.0.0.1', port: '2181'})
  	.ready()
  	.act(
		{role:'seneca-zookeeper-registry',cmd:'list'}, 
		{key:'/k1', recurse:false }, 
		function(error, result) {
			//do something with the result
		}
	)
```


# Action Patterns

#### `role:seneca-zookeeper-registry, cmd:create`

create the path.  

Parameters:

   * key:   string; key name
   * value: any; 

Response: string; [key] created with value [value] .
Note: parent path must exist


#### `role:seneca-zookeeper-registry, cmd:set`

sets the key = value

Parameters:

* key:   string; key name
* value: any; 

Response: none.

#### `role:seneca-zookeeper-registry, cmd:get`

get the value for the key 

Parameters:

* key:   string; key name

Response: string.

#### `role:seneca-zookeeper-registry, cmd:remove`

removes the key

Parameters:

* key:   string; key name

Response: string; [key] removed.

#### `role:seneca-zookeeper-registry, cmd:list`

lists the children for the key.  if the recurse option is set to true, this will return all children and their values.

Parameters:

* key:   string; key name
* recurse: boolean; optional with default to false

Response: object; 
