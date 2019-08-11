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

    let myName;
    let myUser;
    let choiceUser1;
    let choiceUser2;
    let winsUser1 = 0;
    let winsUser2 = 0;
    let statusUser1;
    let statusUser2;

    //Database checking for which choice was made and keeps track of wins
    database.ref("/user1").on("value", function (snapshot) {
        $("#user1").text(snapshot.val().username);
        winsUser1 = snapshot.val().wins;
        if (snapshot.val().choice != "none") {
            choiceUser1 = snapshot.val().choice;
            statusUser1 = snapshot.val().status;
        }

        $("#score1").text(`Wins: ${snapshot.val().wins}`);
    });

    database.ref("/user2").on("value", function (snapshot) {
        $("#user2").text(snapshot.val().username);
        winsUser1 = snapshot.val().wins;
        if (snapshot.val().choice != "none") {
            choiceUser2 = snapshot.val().choice;
            statusUser2 = snapshot.val().status;
        }

        $("#score2").text(`Wins: ${snapshot.val().wins}`);
    });

    //Getting players name and creating user in database
    $("#name-submit").on("click", function () {
        myName = $("#name").val();

        database.ref("/user1").once("value", function (snapshot) {
            var empty = snapshot.child("username").val();
            console.log(empty)
            if (empty == "Waiting for player.") {
                database.ref("/user1").update({
                    username: myName,
                    wins: 0,
                    status: true
                });
                console.log("You are user 1")
                myUser = "/user1";
                $("#name-submit").css("display", "none");
                $("#name").css("display", "none");

            } else {
                database.ref("/user2").update({
                    username: myName,
                    wins: 0,
                    status: true
                });
                console.log("You are user 2")
                myUser = "/user2";
                $("#name").css("display", "none");
                $("#name-submit").css("display", "none");
                database.ref("/user2").onDisconnect().set({
                    username: "Waiting for player.",
                    choice: "none",
                    wins: 0,
                    status: false
                });
                database.ref("/user1").onDisconnect().set({
                    username: "Waiting for player.",
                    choice: "none",
                    wins: 0,
                    status: false
                });
                database.ref().update({
                    status: true
                });
            }
        });
    });

    //clearing player when disconnected
    database.ref().onDisconnect().update({
        status: false,
    });



    //Click events for RPS buttons
    $(".game-btn").on("click", function () {
        let choiceLocal = $(this).attr("value");
        database.ref(myUser).update({
            choice: choiceLocal
        });

        $(".game-btn").css("display", "none")
        game()
    });

    //See if both made a choice
    database.ref().on("value", function (snapshot) {
        if (snapshot.val().status) {
            $(".game-button").css("display", "inline");
        } else {
            $(".game-button").css("display", "none");
        }
    });

    //game logic
    function game(desc) {
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
            database.ref().update({
                status: false
            })

            setTimeout(function () {
                database.ref().update({
                    status: true
                })
            }, 2000);


            if (desc === "user1") {
                winsUser1++;
                database.ref("/user1").update({
                    wins: winsUser1
                })
            } else if (desc === "user2") {
                winsUser2++;
                database.ref("/user2").update({
                    wins: winsUser2
                })

            } else {
                winsUser1++;
                winsUser2++;
                database.ref("/user1").update({
                    wins: winsUser1,
                })
                database.ref("/user2").update({
                    wins: winsUser2,
                })
            }

        }

        choiceUser1 = undefined;
        choiceUser2 = undefined;

    }
    //chat function
    document.onkeyup = function (key) {
        let checkInput = key
        if (checkInput.keyCode == 13 && myName != undefined) {
            console.log($(".chat-line").val());
            database.ref("/chat").push({
                username: myName,
                message: $(".chat-line").val(),
                timeAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    };
    database.ref("/chat").orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        console.log("listened");
        console.log(snapshot.val().username);
        console.log(snapshot.val().message);
        console.log(snapshot.val().timeAdded);

        let newMessage = $("<td>");
        let newName = $("<td>");
        let newTime = $("<td>");

        newMessage.css("text-align", "left");

        newMessage.text(snapshot.val().message)
        newName.text(snapshot.val().username)
        newTime.text(snapshot.val().timeAdded)

        let newRow = $("<tr>")
            .append(newName)
            .append(newMessage)
            .append(moment(snapshot.val().timeAdded).format('LT'));

        $("#chat-table").append(newRow);

    })


    // console.log($(".chatline").val());
});