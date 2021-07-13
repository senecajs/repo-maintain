# chairo-cache
Cache seneca-web route results using a Hapi cache.  Also sets the response `Cache-Control` header to match server-side expiry time.

## Example

Be sure to enable `Cache-Control` headers for 304 status code responses.  The `Cache-Control` header for 304 responses should match what would be sent with the initial 200 response.  See [RFC 7234](https://tools.ietf.org/html/rfc7234#section-5.2).


```javascript

var server = new Hapi.Server({
  cache: [
    {
      name: 'memory-cache',
      engine: require('catbox-memory'),
      host: '127.0.0.1',
      partition: 'cache'
    }
  ]
});

// Enable Cache-Control headers on 304.
server.connection({
  routes: { cache: { statuses: [200,304] } }
});

server.register({ register: Chairo, options: options }, function (error) {
  if (error) throw error;

  server.register({ register: require('chairo-cache'), options: { cacheName: 'memory-cache' } }, function (error) {
    if (error) throw error;

    var seneca = server.seneca;

    // ....

  });
});

```

This plugin adds some extra options to seneca-web's use semantics:

```javascript

  var ONE_HR_MS = 1 * 60 * 60 * 100;

  seneca.act({ role: 'web', use: {
    prefix: '/api/1.0.0/cheeses',
    pin: { role: 'cheeses, cmd: '*' },
    map: {
      'wine_pairings': {GET: true, alias: 'wines', expiresIn: ONE_HR_MS },
      'beer_pairings': {GET: true, alias: 'beers', expiresIn: ONE_HR_MS, privacy: 'public' },
    }
  }});

```
