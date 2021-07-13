State-machine plugin for Seneca
================================

![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

# seneca-sm
[![npm version][npm-badge]][npm-url] 
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coverage-badge]][coverage-url]


## Seneca State-Machine Plugin

This plugin stores and execute a state-machine context. The state machine have two main concepts: _States_ and _Commands_.
At each moment the state machine can be in one single state.
In each state there can be defined one or more commands, result of these commands changing the state of the state machine.

## Seneca State-Machine Plugin

### Install

```sh
npm install seneca-sm
```

### Usage

#### Initialisation

```js
seneca.act( 'role: sm, create: instance', config, function( err, context ) {
})
```

#### Executing commands

```js
seneca.act( 'role: sm, cmd: command-name', {sm_name: sm_name, ....}, function( err, data ) {
})
```

where:
 * _sm-name_ is the name of the state-machine as it was set in the configuration
 * _command-name_ the command to be executed for current state. Should be defined in the configuration.
 * _some_data_ optional JSON containing additional-data for command


#### Retrieving state machine context

```js
seneca.act( 'role: sm, get: context', {sm_name: sm_name} function( err, context ) {
})
```

#### Set data in state-machine context

This command will set some data in the state machine context. This data will be sent to all commands executed on the state machine.

```js
seneca.act( 'role: sm, set: data', {sm_name: sm_name, ....}, function( err, context ) {
})
```

### Load a specific state-machine context

This command can be called after a sm is initialized to change its internal state from the default state to a specific one

```js
seneca.act( 'role: sm, load: state', { sm_name: sm_name, state: state_to_load}, function( err, context ) {
})
```

#### Remove state-machine context

This command will close the state machine. This state machine cannot be used anymore. A new state machine with same name can be started.

```js
seneca.act( 'role: sm, drop: instance', {sm_name: sm_name}, function( err, context ) {
})
```

### Configuration

Configuration structure for state machine is:

 * _validate_ if configuration will be strict validated when instance is created.
 * _name_ name of the state machine - it will be used as role configuration when state machine actions will be called
 * _states_ object defining the states and commands. Key is the state and value an object with
   * _defaults_ default behavior for this state - TBD
   * _initState_ default state for state machine. One single state should have this parameter true
   * _events_ allows adding event hooks trigered when the state changes
     * _before_ called before the state execution - can be the child of the root _states_ object or child of a state 
        * _pattern_ seneca pattern defining the action to be called before the state execution
     * _after_ called after a state is executed - can be the child of the root _states_ object or child of a state
        * _pattern_ seneca pattern defining the action to be called after the state execution
   * _commands_ array with all commands for current state
     * _key_ command to be executed for this state
     * _pattern_ seneca pattern defining the action to be called to execute the state
     * _next_ define transitions based on seneca action result
        * _err_ define next status in case of error - this is a String
        * _success_ value can be:
            * String in this case defines next status in case that Seneca action defined by pattern returns success data
            * Array of objects with following structure:
               * _schema_ Parambulator schema to be applied on callback data
               * _state_ next state in case Parambulator schema matches data


### Example

The following simple state machine will be used as example.

![Diagram](http://www.alexandrumircea.ro/share/seneca-sm/diagram.png)

The configuration to be used for this state machine is:


```javascript
{
  validate: true,
  name:     'sm1',
  states: {
    events: {
      before: {
        pattern: "role: 'transport', execute: 'before_any_state_change'"
      },
      after: {
        pattern: "role: 'transport', execute: 'after_any_state_change'"
      }
    },
    "INIT": {
      initState: true,
      defaults: {
        next: {
          error:   "INIT"
        }
      },
      commands: {
        execute: {
          pattern: "role: 'transport', execute: 'connect'",
          next:  {
            success: "NOT_CONFIGURED"
          }
        },
        disconnect: {
          pattern: "role: 'transport', execute: 'disconnect'",
          next:  {
            success: "INIT"
          }
        }
      }
    },
    "NOT_CONFIGURED": {
      commands: {
        execute: {
          pattern: "role: 'transport', send: 'config'",
          next:  {
            error:   "DISCONNECTED",
            success: "CONNECTED"
          }
        },
        disconnect: {
          pattern: "role: 'transport', execute: 'disconnect'",
          next:  {
            error:   "INIT",
            success: "DISCONNECTED"
          }
        }
      },
      events: {
        before: {
          pattern: "role: 'transport', execute: 'before_notconfigured_state_change'"
        },
        after: {
          pattern: "role: 'transport', execute: 'after_notconfigured_state_change'"
        }
      }
    },
    "CONNECTED": {
      commands: {
        execute: {
          pattern: "role: 'transport', send: 'some_command'",
          next:  {
            error:   "DISCONNECTED",
            success: "CONNECTED"
          }
        },
        disconnect: {
          pattern: "role: 'transport', execute: 'disconnect'",
          next:  {
            error:   "INIT",
            success: "DISCONNECTED"
          }
        }
      }
    },
    "DISCONNECTED": {
      commands: {
        execute: {
          cmd:   '',
          pattern: "role: 'transport', execute: 'cleanup'",
          next:  {
            error:   "INIT",
            success: "INIT"
          }
        },
        disconnect: {
          pattern: "role: 'transport', execute: 'disconnect'",
          next:  {
            error:   "INIT",
            success: "DISCONNECTED"
          }
        }
      }
    }
  }
}
```

### Test

```sh
npm test
```

### Example

For an example of state machine implementation please check this repository [State Machine Example][example-url]

## Contributing
We encourage participation. If you feel you can help in any way, be it with
examples, extra testing, or new features please get in touch.

[travis-badge]: https://api.travis-ci.org/mirceaalexandru/seneca-sm.svg
[travis-url]: https://travis-ci.org/mirceaalexandru/seneca-sm
[npm-badge]: https://badge.fury.io/js/seneca-sm.svg
[npm-url]: https://badge.fury.io/js/seneca-sm
[coverage-badge]: https://coveralls.io/repos/mirceaalexandru/seneca-sm/badge.svg?branch=master&service=github
[coverage-url]: https://coveralls.io/github/mirceaalexandru/seneca-sm?branch=master
[example-url]: https://github.com/mihaidma/seneca-sm-sample

