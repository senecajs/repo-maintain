PHPlabs
=======

Labs I created while at Seneca

Lab 5 - No real PHP. Was just an exercise in getting used to PHP's code block format. Displays a normal HTML form and uses PHP to echo the date at the bottom of the page

Lab 6 - Simple form to rate games. Enters the data into a MySQL database

Lab 7 - A user login system. Will ask the user to login. When the user enters their login information it will look through a MySQL database to determine if the username exists in the database and if the password is correct. If incorrect it will redisplay the page with an "Incorrect Login" message. Upon successful login the user will be redirected to the "Successful Login" page where a welcome message will be displayed with their username.
Users can also request for their password if they have forgot it via the "Forgot Password" link. They will be prompted to enter their email and an email will be sent to the email they provided if the email exists in the database with their password.
If a user attempts to manually enter the URL of any page that requires authentication without being authenticated they will be redirected to the login page.
