seneca-sybase-store
==================

Sybase database layer for Seneca framework

Current Version: 0.0.3

Tested on: Node 0.10.32, Seneca 0.5.21

Use
-----

For using this plugin, please see how the Seneca Data Entities feature works (http://senecajs.org/data-entities.html).

Building
-----
This plugin is base on the **node-odbc** module (https://github.com/wankdanker/node-odbc), which communicates using the native ODBC layer, and thus requires native compilation. Native compilation is managed by **node-gyp**. (https://github.com/TooTallNate/node-gyp). Please see that project for additional prerequisites (including Python 2.7, and C/C++ tool chain).
 See the **node-odbc** module for further build requirements (e.g. unixODBC for Linux/OSX).
 Also, an ODBC driver must be available.

Tests
-----
Prerequisite:
* Must have Adaptive Server Enterprise installed with a working ODBC DataSource. I'ts possible to download a ASE evaluation copy from here: http://infocenter.sybase.com/help/index.jsp?topic=/com.sybase.infocenter.help.ase.16.0/doc/html/title.html
* Go to the /scripts directory and setup the test DB by running the schema.sql script in there (replace SERVERNAME with the ASE server and setup the system to correctly execute the ASE isql tool):
```
isql -S SERVERNAME -U sa -i schema.sql
```
* Setup the ODBC Connection String in `dbconfig.example.js`, for instance if you use FreeTDS (http://www.freetds.org/), the connection String for the test has the form:
```
DRIVER={FreeTDS};SERVERNAME=XXXX;DATABASE=senecatest;UID=senecatest;PWD=senecatest;
```
  Note that in this case the SERVERNAME is the ODBC Server Name, not the ASE Server Name.

* Execute the tests using `npm test` as usual

Notes
-----
See here for the full ODBC error codes reference: http://msdn.microsoft.com/en-us/library/ms714687.aspx

Acknowledgements
----------------

This project was sponsored by [nearForm](http://nearform.com).
