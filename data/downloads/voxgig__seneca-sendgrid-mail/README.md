[![Build Status](https://travis-ci.org/zrrrzzt/seneca-sendgrid-mail.svg?branch=master)](https://travis-ci.org/zrrrzzt/seneca-sendgrid-mail)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/zrrrzzt/seneca-sendgrid-mail.svg)](https://greenkeeper.io/)

# seneca-sendgrid-mail

Seneca SendGrid email plugin.

This is a module for the [Seneca](http://senecajs.org) microservices toolkit.
It's a plugin extension for [seneca-mail](https://github.com/rjrodger/seneca-mail) to enable sending emails via [SendGrid](https://sendgrid.com/).

Visit the [seneca-mail](https://github.com/rjrodger/seneca-mail) page for full usage documention.

Requires Node.js >= 8

## Installation

```sh
$ npm i seneca
$ npm i seneca-mail
$ npm i seneca-sendgrid-mail
```

## Usage

```JavaScript
'use strict'

const seneca = require('seneca')()
const mail = require('seneca-mail')
const sendgridMail = require('seneca-sendgrid-mail')
const sendgridOptions = {
  key: 'YOUR_SENDGRID_API_KEY',
  tag: 'seneca-sendgrid-mail'
}
const email = {
  role: 'mail',
  cmd: 'send',
  text: 'Hi There!',
  to: 'alice@example.com',
  from: 'bob@example.com',
  subject: 'Greetings!'
}

seneca.use(mail)
seneca.use(sendgridMail, sendgridOptions)

seneca.ready(error => {
  if (error) {
    return console.log(error)
  }
  seneca.act(email, (err, response) => {
    if (err) {
      return console.error(err)
    }
    console.log(response)
  })
})

```

## Thx
- [seneca-postmark-mail](https://github.com/rjrodger/seneca-postmark-mail) - for inspiration

## License
[MIT](LICENSE)

![Robohash image of seneca-sendgrid-mail](https://robots.kebabstudios.party/seneca-sendgrid-mail.png "Robohash image of seneca-sendgrid-mail")