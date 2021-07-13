# koa-seneca-auth-middleware
```
	var 	_ = require('lodash'),
			Promise = require('bluebird'),
			seneca = Promise.promisifyAll(require('seneca')()),
			Router = require('koa-router');
	
	module.exports = function(options) {
	
		const defaults = {
			auth_url: '/auth/:strategy',
			callback_url: '/auth/:strategy/callback'
		};
	
		var scriptResponse = "<script>try{window.opener.postMessage('token');}catch(e){};window.close();</script>";
	
		options = _.extend(defaults, options);
	
		const router = new Router();
	
		router.get(options.auth_url, function* () {
			var params = ['request_token', 'verify_token'];
			var authArgs = _.pick(this.req.query, params);
			authArgs.auth = 'authenticate';
	
			authResponse = yield seneca.act(authArgs);
	
			this.body = authResponse;
		});
	
		router.get(options.callback_url, function* () {
	
			var params = ['request_token', 'verify_token'];
			var authArgs = _.pick(this.req.query, params);
			authArgs.auth = 'authenticate';
	
			authResponse = yield seneca.act(authArgs);
	
	
			this.body = scriptResponse;
		});
	
		return router.middleware();
	};
```
