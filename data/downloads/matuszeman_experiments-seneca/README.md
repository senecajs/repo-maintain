# Seneca experiments

Seneca is RPC micro-service framework which offers a way to scale out and delegate server resource intensive "commands".
When seneca command is called the callee does not know who executes the command - It could be ran on local or remote server/s.
Both command input and output is a plain JS object.

For remotely executed commands Seneca have different transport options - TCP, HTTP, AMQP, ...

This experiment tries to come up with a solution for applications with the following requirements:

* Functionality implemented as part of the application codebase can be easily extracted into services running remotely,
  and ideally this should be done with no need to refactor service consumers
* Seneca framework itself introduces some run-time overhead so use of Seneca should be avoided for locally executed
  commands and used only for commands running remotely
* Remotely running services can be scale out horizontally

__Possible advantages over 'native' seneca plugins__

* "Implement and test with existing codebase first" approach and refactor into separate service modules later if required
* Whole application can run from single machine without any remote service dependencies in development environment,
  while in production any single/multiple services can be deployed on separate server instances (matter of configuration only)
* An implementation is Seneca agnostic thus easily re-used with other frameworks/approaches later if needed
* As you would expose remote services consumed by your own application, same approach can be used for 3rd party consumers (TODO security)
* At least but not last - nice OO and very well testable approach

# How to achieve this?

## Seneca concept

Related functionality/commands in Seneca can be grouped into plugins.
A plugin can optionally accept "options" plain object passed on initialization with a seneca client.
If needed, a plugin can optionally register an initialization function which is called asynchronously.
Seneca client waits for all plugins to initialize and only then calls seneca.ready() callback.

## Seneca-ready service specification

Seneca encourages to implement related set of functionality into a plugin. In no-seneca-world this could be translated into a service class methods.
Thus service class methods implement what Seneca plugin commands would implement.

Service methods needs to follow certain rules so they can be migrated into seneca plugin automatically without any refactoring:

* Service instance is stateless
* Class methods accepts one parameter only (plain object, validated by the method itself) and return plain object
* Methods do not mutate arguments
* All methods are asynchronous and can be implemented as generator or using promises
  (promise implementation catches possible exceptions within the code and returns rejected promise in this case)
* Service class implements a method which accepts `options` object (plugin options) `mergeOptions(options)`
* Service class can optionally implement `init()` method which can be used to initialize the service asynchronously (seneca plugin init.)  
* Error handling does not depend on Error instance type

__Error handling__

In case of error, Seneca creates Error object locally and sets Error properties sent from remote service to this local instance.
Thus the application code should not depend on Error instance type neither error message but instead Error properties can be used to distinguish
between different error types.

__TODO__

* Consider using Boom error package for application errors
* ???

# Implementation

## Seneca ready class example

```
class ExampleService {

  constructor() {
    this.options = {
      initDelay: 2000
    };
  }

  // pass an options to the service - plain object
  // a consumer is responsible for calling this before a service is used
  mergeOptions(opts) {
    _.merge(this.options, opts);
  }

  // used to initialize this service asynchronously if needed
  // a consumer is responsible for calling this before a service is used
  init() {
    return Promise((resolve, reject) => {
        // simulates some delay for the plugin to initialize
        setTimeout(resolve, this.options.initDelay);
    });
  }

  *generatorExample(args) {
    // TODO validate args
        
    return {
        example: 'worked'
    };
  }
  
  *generatorError(args) {
    throw new Error('You generated an error');
  }
  
  promiseExample(args) {
    try {
      // TODO validate args
      
      // ... some other code which could possibly raise an synchronous exception
    
      return Promise.resolve({
        example: 'worked'
      });
    } catch(err) {
      return Promise.reject(err);
    }
  }

  promiseError(args) {
    return Promise.reject(new Error('You promised an error'));
  }
  
}
```

# Example applications

This repository implements an [crypto example application](app.js) which encrypt/decrypt specified document fields,
bcrypt hash values and further checks if provided value compares to the hash generated.

It also implements [an error example application](error-app.js) simulating various error handling.

Both applications can be run with a service implemented "locally" as part of the code base or using service proxies
which leverage seneca to call these methods remotely. Important aspect of both applications is that they work without
any modification of their sourcode with both local and seneca services.


## Installation

```
npm install
```

## Run

All application runs below should generate same console output.

### Cryto application

__Local service implementation__

The application uses local services implementations.  

```
node app-local.js
```

__Local service implementation using Seneca__

The application uses same service class instances exposed as [Seneca plugin created by SenecaFactory.createPlugin()](seneca.js)
and accessible using Seneca proxy service created using [SenecaFactory.createProxyService()](seneca.js) 

```
node app-seneca-local.js --seneca.log.quiet
```

__Remote service implementation using Seneca__

As above, the application uses Seneca to access the services, but they are deployed remotely on TCP port 10202 this time.

Start Seneca service server first - starts server listening on TCP port 10202.

```
node app-remote-services.js
```

The application
```
node app-seneca-remote.js --seneca.log.quiet
```


### Error application

__Local service implementation__

```
node error-local.js
```

__Local service implementation using Seneca__

```
node error-seneca-local.js --seneca.log.quiet
```

__Remote service implementation using Seneca__

Start Seneca service server first (same as for Crypto application) 
```
node app-remote-services.js
```

The application
```
node error-seneca-remote.js --seneca.log.quiet
```
