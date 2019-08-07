$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCfYitBq0SNPPMQZzQxS22EliYfATvr7-s",
        authDomain: "rps-multiplayer-bcf99.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-bcf99.firebaseio.com",
        projectId: "rps-multiplayer-bcf99",
        storageBucket: "",
        messagingSenderId: "689735897481",
        appId: "1:689735897481:web:d1b700263c2a4d52"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();


    let myName = "";
    let keyPlayer = 0;
    let random = Math.floor(Math.random() * 2)


    // //Live stream how many players are online
    // let countPlayers = database.ref("/users").on("value", function (snapshot) {
    //     numberOfPlayers = snapshot.numChildren();
    // })

    //Database listener
    function checkUser() {
        database.ref("/user1").once("value", function (snapshot) {
            var a = snapshot.child("username").val();
            console.log(a)
            if (a == "none") {
                database.ref("/user1").update({
                    username: myName
                });
                console.log("You are user 1")
            } else {
                database.ref("/user2").update({
                    username: myName
                });
                console.log("You are user 2")
            }
        });
    }

    //Getting players name and creating user in database
    $("#name-submit").on("click", function () {
        myName = $("#name").val();
        checkUser();
        // addUser(myName);
    });

    //clearing player when disconnected
    database.ref("user1/").onDisconnect().set({
        username: "none",
        choice: "none"
    });
    database.ref("user2/").onDisconnect().set({
        username: "none",
        choice: "none"
    });

    //Click events for RPS buttons
    $(".btn").on("click", function () {
        console.log($(this).attr("value"));
        choiceLocal = $(this).attr("value");
    });


    //Which player am I?
    // database.ref().once("value")
    //     .then(function (snapshot) {
    //         var key1 = snapshot.val().onlineP1;
    //         var key2 = snapshot.val().onlineP2;
    //         if (key1 == false) {
    //             playerNumber = 1;
    //             database.ref().update({
    //                 onlineP1: true
    //             });
    //         } else if (key2 == false) {
    //             playerNumber = 2
    //             database.ref().update({
    //                 onlineP2: false
    //             });
    //         } else {
    //             console.log("Game full");
    //         }
    //         console.log(playerNumber);
    //     });


    // switch () {

    //     case '11':
    //         computerScore = 1;
    //         playerScore = 1;
    //         console.log("Both win!");
    //         desc = "Both win!";
    //         break;
    //     case '22':
    //         computerScore = 1;
    //         playerScore = 1;
    //         console.log("Both win!");
    //         desc = "Both win!";
    //         break;
    //     case '33':
    //         computerScore = 1;
    //         playerScore = 1;
    //         console.log("Both win!");
    //         desc = "Both win!";
    //         break;
    //     case '12':
    //         computerScore = 0;
    //         playerScore = 1;
    //         console.log("Player wins!");
    //         desc = "Player wins!";
    //         break;
    //     case '21':
    //         computerScore = 1;
    //         playerScore = 0;
    //         console.log("Computer wins!");
    //         desc = "Computer wins!";
    //         break;
    //     case '13':
    //         computerScore = 1;
    //         playerScore = 0;
    //         console.log("Computer wins!");
    //         desc = "Computer wins!";
    //         break;
    //     case '31':
    //         computerScore = 0;
    //         playerScore = 1;
    //         console.log("Player wins!");
    //         desc = "Player wins!";
    //         break;
    //     case '23':
    //         computerScore = 0;
    //         playerScore = 1;
    //         console.log("Player wins!");
    //         desc = "Player wins!";
    //         break;
    //     case '32':
    //         computerScore = 1;
    //         playerScore = 0;
    //         console.log("Computer wins!");
    //         desc = "Computer wins!";
    //         break;
    // }

    // $("#paper-btn").on("click", () => console.log("paper"));
    // $("#scissors-btn").on("click", () => console.log("scissors"));

});