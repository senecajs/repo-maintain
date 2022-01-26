# seneca-group
[Seneca](senecajs.org) plugin for user and group membership.

[![Npm][BadgeNpm]][Npm]
[![Travis][BadgeTravis]][Travis]
[![Coveralls][BadgeCoveralls]][Coveralls]



## Quick Example

```
```



<!--START:action-list-->


## Action Patterns

* [add:group,role:group](#-addgrouprolegroup-)
* [add:user,role:group](#-adduserrolegroup-)
* [amend:group,role:group](#-amendgrouprolegroup-)
* [get:group,role:group](#-getgrouprolegroup-)
* [is:user-group-owner,role:group](#-isusergroupownerrolegroup-)
* [list:group,role:group](#-listgrouprolegroup-)
* [list:group-owner,role:group](#-listgroupownerrolegroup-)
* [list:user,role:group](#-listuserrolegroup-)
* [list:user-group,role:group](#-listusergrouprolegroup-)
* [make:group,role:group](#-makegrouprolegroup-)
* [remove:group,role:group](#-removegrouprolegroup-)
* [remove:user,role:group](#-removeuserrolegroup-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `add:group,role:group` &raquo;

No description provided.


#### Parameters


* _id_ : string <i><small>{presence:required}</small></i>
* _owner_id_ : string <i><small>{presence:required}</small></i>
* _code_ : string
* _tags_ : array


----------
### &laquo; `add:user,role:group` &raquo;

No description provided.


#### Parameters


* _user_id_ : string <i><small>{presence:required}</small></i>
* _group_id_ : string <i><small>{presence:required}</small></i>
* _code_ : string
* _tags_ : array


----------
### &laquo; `amend:group,role:group` &raquo;

No description provided.


#### Parameters


* _id_ : string
* _owner_id_ : string
* _code_ : string
* _group_ : object <i><small>{unknown:true,presence:required}</small></i>


----------
### &laquo; `get:group,role:group` &raquo;

No description provided.


#### Parameters


* _id_ : string
* _owner_id_ : string
* _code_ : string


----------
### &laquo; `is:user-group-owner,role:group` &raquo;

No description provided.



----------
### &laquo; `list:group,role:group` &raquo;

No description provided.


#### Parameters


* _owner_id_ : string <i><small>{presence:required}</small></i>
* _code_ : string


----------
### &laquo; `list:group-owner,role:group` &raquo;

No description provided.


#### Parameters


* _id_ : string <i><small>{presence:required}</small></i>
* _as_ : string


----------
### &laquo; `list:user,role:group` &raquo;

No description provided.


#### Parameters


* _group_id_ : string <i><small>{presence:required}</small></i>
* _code_ : string


----------
### &laquo; `list:user-group,role:group` &raquo;

No description provided.


#### Parameters


* _user_id_ : string <i><small>{presence:required}</small></i>
* _owner_id_ : string
* _owner_code_ : string
* _group_id_ : string
* _group_code_ : string


----------
### &laquo; `make:group,role:group` &raquo;

No description provided.


#### Parameters


* _owner_id_ : string <i><small>{presence:required}</small></i>
* _group_ : object <i><small>{unknown:true,presence:required}</small></i>
* _unique_ : boolean


----------
### &laquo; `remove:group,role:group` &raquo;

No description provided.


#### Parameters


* _id_ : string <i><small>{presence:required}</small></i>
* _owner_id_ : string <i><small>{presence:required}</small></i>


----------
### &laquo; `remove:user,role:group` &raquo;

No description provided.


#### Parameters


* _user_id_ : string <i><small>{presence:required}</small></i>
* _group_id_ : string <i><small>{presence:required}</small></i>
* _code_ : string


----------


<!--END:action-desc-->




[BadgeCoveralls]: https://coveralls.io/repos/voxgig/seneca-group/badge.svg?branch=master&service=github
[BadgeNpm]: https://badge.fury.io/js/seneca-group.svg
[BadgeTravis]: https://travis-ci.org/voxgig/seneca-group.svg?branch=master
[Coveralls]: https://coveralls.io/github/voxgig/seneca-group?branch=master
[Npm]: https://www.npmjs.com/package/seneca-group
[Travis]: https://travis-ci.org/voxgig/seneca-group?branch=master
