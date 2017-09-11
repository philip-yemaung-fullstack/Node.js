Create an Express application that accepts users subscriptions for a newsletter app:
Upon calling (/newsletter), a form will be displayed asking the user to enter their email address.

Upon submitting the form (POST) to (/newsletter), append the data 
to a file called (subscribers.txt), then redirect the user to a
(/thankyou) page that's going to display:
Your email {{EMAIL}} has been added successfully to our subscribers list.

Validate that email is valid and not empty.
Protect the application against Cross-Site Request Forgery attack.