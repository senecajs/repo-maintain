# @seneca/user-telemetry

[![Npm][BadgeNpm]][Npm]
[![Travis][BadgeTravis]][Travis]
[![Coveralls][BadgeCoveralls]][Coveralls]


A [Seneca](senecajs.org) plugin that provides basic user telemetry operations and integrates with various third party services.


## Install

```sh
$ npm install @seneca/user-telemetry
```



<!--START:action-list-->


## Action Patterns

* [get:stats,sys:user-telemetry](#-getstatssysusertelemetry-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `get:stats,sys:user-telemetry` &raquo;

Get event collection statistics.




#### Examples



* `get:stats,sys:user-telemetry,get:stats`
  * 



#### Replies With


```
{
  _start: 'Start time',
  _last: 'Last event time',
  _instance: 'Seneca instance id',
  user_cmd: 'Count of _user_cmd_ (e.g. register, login, ...) events seen'
}
```


----------


<!--END:action-desc-->


[BadgeCoveralls]: https://coveralls.io/repos/voxgig/seneca-user-telemetry/badge.svg?branch=master&service=github
[BadgeNpm]: https://badge.fury.io/js/%40seneca%2Fuser-telemetry.svg
[BadgeTravis]: https://travis-ci.org/voxgig/seneca-user-telemetry.svg?branch=master
[Coveralls]: https://coveralls.io/github/voxgig/seneca-user-telemetry?branch=master
[Npm]: https://www.npmjs.com/package/@seneca/user-telemetry
[Travis]: https://travis-ci.org/voxgig/seneca-user-telemetry?branch=master
