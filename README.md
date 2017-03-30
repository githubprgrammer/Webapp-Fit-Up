# Webapp
This is a Webapplication for the Administration of the Fit-Up-App.
The Admin is able to change the settings of the app. He is able to choose between 3 different assignmenttypes(sameForall, randomized and alternating) to assign certain motivationmethods to the App users. It is possible to determin time periods for the different assignmenttypes and also different combinations of motivation methods. 

Furthermore the Admin can upload motivation texts and images which will show up in the App at certain events.
He can set up time phases and the frequency of sending pushnotes to the user after his training. The time period the BSA-questionnary is referring to can also be changed.


The Webapp is a pure javascript/css/html application with firebase as the database in the backend. 
So you can start the app right away by opening index.html in a browser.

The authentication process takes place in firebase. The Admin gives in his registered email-adress and password, and the Webapp sends a request to firebase. If everything is correct the Admin gets forwarded to the main page(assign.html) where he can navigate throug the webapp.

Because the Fit Up Webapp is only intended for a limited circle of users the database-Admin as a controlling instance is responsible for registering the Webapp Admins. He may do so by going to the firebase console, clicking on the Authentification tab and adding the new user. 

This Webapp is not responsive. The ideal resolution for the Webapp is 1600x900. The minimal resolution: 1280x600.