General instructions:
---------------------

Tested on OS X Yosemite.

## Set up

1) Install [Docker Toolbox](https://www.docker.com/toolbox).  This works better than using docker & boot2docker OS X homebrew packages in my experience.
2) You can use the quickstart terminal in `/Applications/Docker/` or else, add the following alias to your `~/.bash_profile` and then run the `docker-cli` command from bash.

```bash
alias docker-cli='source /Applications/Docker/Docker\ Quickstart\ Terminal.app/Contents/Resources/Scripts/start.sh'
```

3) Now docker and docker-compose are ready to use from the command line.
4) Run `echo $DOCKER_HOST` to see the IP for the external Docker network.

## Projects in this repo

See individual project's READMEs and package.json scripts for more info on each one.

### [seneca-docker-image](./seneca-docker-image)
  This is a project used to build a Docker image that hosts a seneca instance.

### [example-service](./example-service)
  This project shows a basic example of how to use seneca-docker-image.

### [test-harness](./test-harness)
  This project provides Docker Compose definitions that can be reused in transport tests.

### [beanstalk-test](./beanstalk-test)
  This project uses test-harness and creates a Docker cluster with an Nginx load balancer, web instances, worker instances, and a beanstalkd server.  A basic connectivity/performance test can be run.

### [beanstalk-test-2](./beanstalk-test-2)
  This project uses test-harness and creates a Docker cluster with worker instances and a beanstalkd server.  The cluster is tested from the host machine.  (Doesn't work; needs to be debugged.)

### [beanstalk-test-3](./beanstalk-test-3)
  This project uses test-harness and creates a Docker cluster with worker instances, test instances, and a beanstalkd server.  Tests are run from the test instances inside the Docker cluster.

