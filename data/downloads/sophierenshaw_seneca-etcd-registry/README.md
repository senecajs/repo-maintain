# seneca-etcd-registry
The seneca-etcd-registry driver uses etcd to support service discovery mechanisms; offering support for tree-based key-value structures.

## etcd
etcd is distributed, consistent key value store for shared configuration and service discovery - https://github.com/coreos/etcd

### Getting etcd running

    wget https://github.com/coreos/etcd/releases/download/v2.0.11/etcd-v2.0.11-linux-amd64.tar.gz -o etcd-v2.0.11-linux-amd64.tar.gz
    tar xzvf etcd-v2.0.11-linux-amd64.tar.gz
    cd etcd-v2.0.11-linux-amd64
    ./etcd
    
### Setting and Getting Keys

    ./etcd set key "value"
    ./etcd get key
    
## node-etcd
The best node.js module for connecting to etcd was node-etcd - https://www.npmjs.com/package/node-etcd

    npm install node-etcd
   
### Basic Usage

    Etcd = require('node-etcd');
    etcd = new Etcd();
    etcd.set("key", "value");
    etcd.get("key", console.log);
    etcd.del("key");

## Action Patterns


#### `role:etcd-registry, cmd:set`

Set the value of a key.

Parameters:

   * key:   string; key name
   * value: any; key value; serialized to JSON

Response: none.


#### `role:etcd-registry, cmd:get`

Get the value of a key.

Parameters:

   * key:   string; key name

Response:

   * value: any; key value; deserialized from JSON


#### `role:etcd-registry, cmd:list`

List the sub keys of a key, under the tree structure, with _/_ as branch separator.

Parameters:

   * key:     string; key name or partial prefix name of key to query
   * recurse:  boolean, optional, default: false; if true, list all sub keys, if false, list only child keys 

Response:

   * keys: array[string]; keys in breadth first order


#### `role:etcd-registry, cmd:remove`

Remove the value of a key, and optionally all sub keys.

Parameters:

   * key:     string; key name or partial prefix name of key to remove
   * recurse:  boolean, optional, default: false; if true, remove value and all sub keys, if false, remove only value 

Response: none
