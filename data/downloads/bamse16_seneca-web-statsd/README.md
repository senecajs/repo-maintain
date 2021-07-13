Seneca-Web-StatsD
-----------------

Adds a custom key (statsdKey) to Express request object with the current HTTP path. This key is used by express-statsd as key for the logged stats. For a HTTP POST request to /api/hello/world the key would look like hostname.env.http.post.api.hello.world. 

The module takes as parameter an optional function that can modify the HTTP path.

Usage
-----

In you Seneca module:

	var senecaWebStatsd = require('seneca-web-statsd');

then in the `register` set the `startware` key:

	register(null, this.http({
    prefix:'/api/',
    pin:{role:name, cmd:'*'},
    map:{
      ping:{GET:true},
    },
    startware:senecaWebStatsd.startwareFunc(function(path){
    	return path+'.altered.path';
    })
  }));
