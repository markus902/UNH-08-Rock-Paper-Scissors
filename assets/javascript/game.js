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
        let myUser;
        let status;
        let choiceUser1;
        let choiceUser2;
        let winsUser1 = 0;
        let winsUser2 = 0;
        let random = Math.floor((Math.random() * 2) + 1);
        console.log("Random: " + random);


        $(".game-button").css("display", "none");

        //Putting out choices
        database.ref("/user1").on("value", function (snapshot) {
            $("#user1").text(snapshot.val().username);
            if (snapshot.val().choice != "none") {
                choiceUser1 = snapshot.val().choice;
            }
            database.ref("/user1").update({
                wins: winsUser1
            });
        });
        database.ref("/user2").on("value", function (snapshot) {
            $("#user2").text(snapshot.val().username);
            if (snapshot.val().choice != "none") {
                choiceUser2 = snapshot.val().choice;
            }
            database.ref("/user1").update({
                wins: winsUser1
            });
        });

        //Getting players name and creating user in database
        $("#name-submit").on("click", function () {
            myName = $("#name").val();

            database.ref("/user1").once("value", function (snapshot) {
                var empty = snapshot.child("username").val();
                console.log(empty)
                if (empty == "none") {
                    database.ref("/user1").update({
                        username: myName,
                        turn: false
                    });
                    console.log("You are user 1")
                    myUser = "/user1";
                    $("#name-submit").css("display", "none");
                    $("#name").css("display", "none");
                } else {
                    database.ref("/user2").update({
                        username: myName,
                        turn: false
                    });
                    console.log("You are user 2")
                    myUser = "/user2";
                    $("#name").css("display", "none");
                    $("#name-submit").css("display", "none");
                    database.ref().update({
                        status: true
                    })
                }

            });
        });

        //clearing player when disconnected
        database.ref("/user1").onDisconnect().set({
            username: "none",
            choice: "none",
            turn: false
        });
        database.ref("/user2").onDisconnect().set({
            username: "none",
            choice: "none",
            turn: false
        });
        database.ref().onDisconnect().update({
            status: false,
            turn: false
        });


        //Click events for RPS buttons
        $(".game-btn").on("click", function addbuttons() {
            console.log($(this).attr("value"));
            let choiceLocal = $(this).attr("value");

            database.ref(myUser).update({
                choice: choiceLocal
            });
            database.ref().update({
                status: false
            });
            $(".game-button").css("display", "none")
            game();
        });

        //See if both made a choice

        database.ref().on("value", function (snapshot) {
            console.log(snapshot.val().status)
            if (snapshot.val().status) {
                $(".game-button").css("display", "inline");
            }

        });

        function game(desc) {
            console.log("Choice User 1 " + choiceUser1)
            console.log("Choice User 2 " + choiceUser2)
            if (choiceUser1 != undefined && choiceUser2 != undefined) {
                console.log(choiceUser1 + choiceUser2);

                switch (choiceUser1 + choiceUser2) {

                    case '11':
                        desc = "tie!";
                        break;
                    case '22':
                        desc = "tie";
                        break;
                    case '33':
                        desc = "tie";
                        break;
                    case '12':
                        desc = "user2";
                        break;
                    case '21':
                        desc = "user1";
                        break;
                    case '13':
                        desc = "user1";
                        break;
                    case '31':
                        desc = "user2";
                        break;
                    case '23':
                        desc = "user2";
                        break;
                    case '32':
                        desc = "user1";
                        break;
                }
                console.log(desc)
                if (desc === "user1") {
                    winsUser1++;
                } else if (desc === "user2") {
                    winsUser2++;

                } else {
                    winsUser1++;
                    winsUser2++;
                }
                console.log(winsUser1);
                console.log(winsUser2);
            }

        }

    }

);