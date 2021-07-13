Seneca Multi-tenanted Microservices Example
===========================================

Multi-tenanted microservices example with subdomain context and store interceptors.  Demo for [Node Dublin November 2015](http://www.nodejsdublin.com).

Read `index.js`, possibly the smallest multi-tenatanted platform in the world...ever. Then, set up some tenant subdomains in `/etc/hosts`:

```
127.0.0.1	localhost a.example.com b.example.com c.example.com d.example.com
```

and run:

```
node index.js
```

with Node 4.2.x

MIT Licenced.
