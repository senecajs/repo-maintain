![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

## What is this? 
__[MongoDB](https://docs.mongodb.com/v3.0/introduction/)-Seneca__ integration example 

Ejemplo de integración __MongoDB-Seneca__ 
  

## What does it do?
__CRUD (Create Read Update Delete) MongoDB application__

You need virtual or physical machine where microservice will run. You can use your localhost by simply changing port number (it must be different from client.js).

***

__Aplicación CRUD (Create Read Update Delete) con MongoDB__

Necesitarás una máquina virtual o física donde se ejecutará el microservicio. Puedes usar tu localhost simplemete cambiando el puerto (debe ser diferente al de client.js).

## Pre-requisites
You need to have installed on localhost and remote host - Necesitas tener instalado en local y en remoto: __node.js, npm, express, seneca and seneca-entity__.

For Debian and Debian-derived operating systems - Para Debian y sistemas operativos derivados:
```
$ sudo apt install nodejs

$ sudo apt install npm

$ npm install express

$ npm install seneca

$ npm install seneca-entity
```
__Install seneca-mongo-store__ if you don't on remote host - __Instala seneca-mongo-store__ si no lo tienes instalado en la máquina remota:
```
$ npm install seneca-mongo-store
```


## Executing
Be sure __MongoDB server is running on remote host__ (where service_user.js file is) - Asegúrate que el __servidor de MongoDB está ejecutándose en el host remoto__ (donde está el archivo service_user.js):
```
$ sudo service mongod status => active (running)
```
Local:
```
$ nodejs client.js
```
Copy service_user.js file in another machine and then:
```
$ nodejs service_user.js
```

## Try it
 Try it writing in browser - Pruébalo escribiendo en el navegador:
  
   Create user: [http://localhost:3000/users/add/?nusu=Peter Smith&age=34&address=123, Main Street&email=psmith@email.com ](http://localhost:3000/users/add/?nusu=Peter Smith&age=34&address=123, Main Street&email=psmith@email.com) 
   
   Get all users: [http://localhost:3000/users/get/](http://localhost:3000/users/get/)
   
   Get an user by id: [http://localhost:3000/users/getId/577cc3a16f5a22e20d054da0](http://localhost:3000/users/getId/577cc3a16f5a22e20d054da0)     //Change id
   
   Update user name by id: [http://localhost:3000/users/updateId/577c40be46febb975c1f3282/Paul Simpson](http://localhost:3000/users/updateId/577c40be46febb975c1f3282/Paul Simpson)    //Change id
   
   Remove an user by id: [http://localhost:3000/users/deleteId/577cc3a16f5a22e20d054da0](http://localhost:3000/users/deleteId/577cc3a16f5a22e20d054da0)     //Change id


## References
All documentation in [Seneca.js](http://senecajs.org) site.

Reference book: [Developing Microservices with Node.js - David González](https://www.packtpub.com/web-development/developing-microservices-nodejs)
