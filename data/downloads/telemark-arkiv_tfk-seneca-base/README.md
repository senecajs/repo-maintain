# tfk-seneca-base
Base for our seneca services

## Docker
Build the image

```
$ docker build -t tfk-seneca-base .
```

Start

```
$ docker run -d --net host --name tfk-seneca-base tfk-seneca-base
```

From hub.docker.com

```
$ docker run -d --net host --name tfk-seneca-base telemark/tfk-seneca-base
```
