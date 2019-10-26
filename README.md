# Rock-Paper-Scissors Online Multiplayer Game

Deployment link: https://markus902.github.io/UNH-08-Rock-Paper-Scissors/

### Scope

This project focuses on the use of Firebase to create a Rock-Paper_scissors Game for 2 Players.

### Code Structure

When the first player visits the page, the app asks to put in the name and automatically assigns the player number 1 and waits until the second player arrives and enters his/her name. The names are stored in Firebase. In the next step the app displays the 3 choices to be made. After both palyers entered their choice the app stores the values in Firebase and evaluates the outcome with a switch statement. The winner will be prompted via alert and the score of the round is pushed to Firebase. The app also provides a chat function wich pushes the entries with timestamps to Firebase. The entries are displayed with converted time in the chat window. 
If one of the players looses the connection to firebase the opponent will be notifid with a message.


### Features

* JQuery

* Moment.js

* Materialize

* Game logic

* Alerts for game progress

* Responsive design

* Firebase