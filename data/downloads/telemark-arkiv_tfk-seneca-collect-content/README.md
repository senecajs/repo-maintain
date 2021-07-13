[![Build Status](https://travis-ci.org/telemark/tfk-seneca-collect-content.svg?branch=master)](https://travis-ci.org/telemark/tfk-seneca-collect-content)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-seneca-collect-content

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-seneca-collect-content.svg)](https://greenkeeper.io/)
Seneca content collector

## Messages handled

### ```cmd: collect-info, type: user```

Collects content for a user and/or a user's roles

```JavaScript
seneca.act({cmd: 'collect-info', type:'user', user:user, roles:[roles]}, (error, data) => {})
```

## Messages emitted

### ```role: info, info: content-collected```

Contains collected info for user/role wrapped in the data property

```JavaScript
{
    system: 'systemname',
    type: 'news',
    user: user,
    data: [] //collected info
  }
```

## Example

```JavaScript
'use strict'

const seneca = require('seneca')()
const content = require('./index')
const options = {
  type: 'news',
  channelId: 'news',
  feedHostUrl: 'https://info.portalen.no/articles.json',
  verbose: true, // optional
  timeout: 2000 // optional, defaults to 5000 ms
}

seneca.add('role: info, info: content-collected', (args, callback) => {
  console.log(args.data)
})

seneca.use(content, options)

seneca.act('cmd: collect-info, type: user', {user: 'gasg', roles: ['alle', 'administrasjonen']})
```

## License
[MIT](LICENSE)
