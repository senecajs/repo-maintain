Seneca
======

and again a edigit variant

I've decided to freshen up my javaEE skills and start a more serious project on my own. The goal is a complete renewal of my previous project called "edigit" back in 2007~2009. Edigit allowed schools to display schedules, infomation and misc. content on big screens and manage these as so called presentations. Back in 2007 I've just startet with java(EE) and especially webdevelopment. So from a current point of view it's more than just deprecated. It has know security flaws, too....


Technologies to use:
ee6, cdi, ejb 3.1, jpa, jsf2, javascript, jquery, angularjs, rest, bootstrap

Needs the following:
glassfish 3.x application server
a relational database for which glassfish has jdbc drivers ;-)

modern browsers.


Features:
upload documents
manage documents into presentations
handle multiple presentations
handle multiple viewers.

user management
(not sure if I should use something like openid, oauth2, securesocial?)



TODO:
-powerpoint to presentation converter:
creates a whole presentation with presentationitems and documents for an uploaded ppt(x) file. This will initially not be enabled (or no viewport is set).


-websocket / publish feature to tell the clients to update their view-programme.
