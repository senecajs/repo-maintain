seneca-sample
=============

seneca sample

```
✈ tree -L 2 .
.
├── server-client
│   ├── client.coffee
│   ├── node_modules
│   ├── package.json
│   └── server.coffee
└── standalones
    ├── node_modules
    ├── package.json
    ├── sample1.coffee
    ├── sample2.coffee
    └── sample3.coffee
```

# standalones

```
% cd standalones
% npm install
% coffee sample1.coffee
```

# server-client

```
% cd server-client
% npm install
% coffee server.coffee
% coffee client.coffee # another shell
```

# with Docker

```
% sudo docker build -t <name>/seneca-sample .
% sudo docker run -p 8080 -d <name>/seneca-sample
% sudo docker logs 177ef3ddb40b
2014-12-02T06:02:58.014Z        0ij06xnz7tvt/1417500178001/-    INFO    hello   Seneca/0.5.21/0ij06xnz7tvt/1417500178001/-
2014-12-02T06:02:58.718Z        0ij06xnz7tvt/1417500178001/-    INFO    plugin  transport       -       ACT     542er0mj5w3l   l
isten   {type=web,port=8080,host=0.0.0.0,path=/act,protocol=http,timeout=32778,msgprefix=seneca_,callmax=111111,msgidlen=12,role
=transport,hook=listen}
% coffee client.coffee http 8080
2014-12-02T06:06:18.491Z        hjz5momaj8zo/1417500378478/-    INFO    hello   Seneca/0.5.21/hjz5momaj8zo/1417500378478/-
2014-12-02T06:06:19.218Z        hjz5momaj8zo/1417500378478/-    INFO    plugin  transport       -       ACT     b061k51aiszi   c
lient   {type=web,port=8080,host=0.0.0.0,path=/act,protocol=http,timeout=32778,msgprefix=seneca_,callmax=111111,msgidlen=12,role
=transport,hook=client} any
null { answer: 3 }
```

# License

MIT
