![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

## What is this? 
Simple microservice example, running on 2 servers.

Ejemplo sencillo de microservicios, ejecutándose en 2 servidores.


## What does it do?
Adds and multiplies two given numbers. Each math operation is executed on different machines, and subtracts two given numbers on localhost.

You need virtual or physical machines where microservices will run. You can use your localhost by simply changing port number (it must be different from client.js).

***

Suma y multiplica dos números dados. Cada operación matemática es ejecutada en máquinas diferentes, y resta dos números en local.

Necesitarás máquinas virtuales o físicas donde se ejecutarán los microservicios. Puedes usar tu localhost simplemete cambiando el puerto (debe ser diferente al de client.js).


## Pre-requisites
You need to have installed on localhost and remote host - Necesitas tener instalado en local y en remoto: __node.js, npm, express and seneca__.

For Debian and Debian-derived operating systems - Para Debian y sistemas operativos derivados:
```
$ sudo apt install nodejs

$ sudo apt install npm

$ npm install express

$ npm install seneca
```


## Executing
Local:
```
$ nodejs client.js
```
Copy service_sum.js file in a machine and then:
```
$ nodejs service_sum.js
```
Copy service_prod.js file in another machine and then:
```
$ nodejs service_prod.js
```


## Try it
 Try it clicking on links below - Pruébalo pinchando en los links:
 
 Sum: [http://localhost:3000/operations/addnum/?right=2&left=33](http://localhost:3000/operations/addnum/?right=2&left=33)
 	      
 Product: [http://localhost:3000/operations/multnum/?right=2&left=33](http://localhost:3000/operations/multnum/?right=2&left=33) 
 
 Subtract: [http://localhost:3000/operations/subnum/?right=2&left=33](http://localhost:3000/operations/subtnum/?right=2&left=33)


## References
All documentation in [Seneca.js](http://senecajs.org) site.

Reference book: [Developing Microservices with Node.js - David González](https://www.packtpub.com/web-development/developing-microservices-nodejs)
