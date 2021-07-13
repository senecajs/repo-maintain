
Principles
----------

seneca-archive plugs into your seneca data flow, intercepts archived objects and acts as if it is the principal database.

Archiving requires 2 seneca instances. That allows to have separate configurations and flows for these 2 instances.
The principal instance is the one that your use for regular DB transactions. seneca-archive is layered into this principal
instance.

When a request is unsatisfied in the principal instance, seneca-archive attempts to run the query against the secondary
instance. If unsuccessful, seneca-archive will return the result from the principal instance.

For your application, handling archived entities is completely transparent.

### Performance considerations

- For regular objects, the process has very little overhead.
- For 'misses' the process has maximum overhead of hitting 2 entity chains. A miss is a request on an entity that exists in
neither the principal nor the secondary database.
- For an archived entity, the overhead is to first attempt to access the entity in the principal DB and then the secondary
one.
- When searching multiple entities, queries are run against all DBs. This negative overhead can be cancelled by the use of a
3rd party indexing engine (eg. elasticsearch)


Installation
------------

    npm i --save seneca-archive

You will also need [seneca](https://github.com/rjrodger/seneca).


Usage
-----

    var oneMonthAgo = ...
    var oneYearAgo  = ...

    seneca.use('archive', {

      archivalInstance: senecaInstance,
      directArchival: true,
      checkExistsBeforeUpdate: true,
      conditions: {
        'sys/user': [
          { lastLogin: { $lt: oneYearAgo } },
          { lastLogin: null, active: false, registrationDate: oneMonthAgo }
        ]
      }

    })

### Options

#### archivalInstance

This is the seneca secondary instance used to manage the archived objects.

#### directArchival

if directArchival is enabled/disabled (enabled by default). When anabled, new entities are checked against the archival
conditions. If they match, these entities are directly saved in the archival DB.

#### checkExistsBeforeUpdate

check in which DB the updated entity lives. true by default.
This should be set to false if the DB driver throws an error when a non existing entity is updated.

#### conditions

For each entity type that should be archived, a list of conditions that should be met for an entity to be archived.

Triggering the archival process
-------------------------------

The archival process should be triggered externally. seneca-archive does not have it's own cron like schedule so that's up to you.

Archiving consists in doing a full database scan for each entity and then moving the right entities into the secondary DB.

    seneca.act({role: 'archive', cmd: 'scan', skip: 0, limit: 100, entity: 'sys/user'}, function(args, done) {

    })

The option ```entity``` is optional. If not set, the archival check will apply to all entity types defined in the plugin's global
options.
