# seneca-worldpay - Node.js module

## Worldpay payments strategy for seneca-pay <a href="https://github.com/rjrodger/seneca">Seneca</a> plugin

Dependencies: [seneca-pay](/iantocristian/seneca-pay)

### Usage

     seneca.use('seneca-pay',{
        worldpay: {
          merchantCode: 'MYMERCHANT',
          password: 'secret'
        },
        redirect: {
          hostUrl: 'http://www.mywebsite.com',
          success: '/completed',
          fail: '/cancelled'
        }
     })

     seneca.use('seneca-worldpay')
