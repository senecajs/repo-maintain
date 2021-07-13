seneca-influx-store
===================

Seneca + InfluxDB PoC

In it's current state it isn't fully functional however, CRUD operations can be performed.


Usage:

````
/*InfluxDB Configuration*/

var seneca = require('seneca');
var username = 'root';
var password = 'root';
var database = 'test_db';
var host = 'localhost';

var spec = {host : host, username : username, password : password, database : database};

var si = seneca()
si.use(require('..'), spec);


var updateTest = si.make$('test');
updateTest.p1 = 'value1'
updateTest.p2 = 3
updateTest.id = 4846389963;
updateTest.sequence_number=1230001;
updateTest.time = 4846389963;

updateTest.save$(function(err, res){
	
});


var cl = si.make$('test')
cl.p1 = 'value1'
cl.p2 = 2

cl.save$(function(err, res){
	
});


var loadTest = si.make$('test');

loadTest.load$(185540528645, function(err, entity){
	
})

var listTest = si.make$('test');

listTest.list$({'p1': 'value1'}, function(err, entities){
	
})

var deleteTest = si.make$('test')

deleteTest.remove$({id: 652047077711}, function(err){
	
})
````