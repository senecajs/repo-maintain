seneca_python_driver
==================

Python driver for Seneca, the micro-services toolkit for Node.js.  Allows you to call remote microservices and create microservices in Python.

Usage
-----

This module has been tested using the following setup:
Python 2.7.2
Node.js v0.10.32
Seneca v0.05.20

This driver can be used to access the Seneca microservices by utilising the senecaclient class within your own python code or by passing http requests to the webserver class.

To use the senecaclient class, refer to the senecaclient_tests file for sample code.

To use the webserver class, run the class in the terminal window and then refer to the webserver_tests file for sample code.

You can also test the webserver from separate terminal windows as follows:

1. run the server: python webserver.py
2. curl -d '{"color":"red"}' http://localhost:8888/act

Ensure the seneca microservices server is running and can receive your requests, follow guidelines here:
https://github.com/rjrodger/seneca-transport


TODO
----

1. Validate do_get method of webserver
2. Add TCP communication functionality
