    var config = {
        apiKey: "AIzaSyCfQdNEf99hClfaKM5oiydSqCUFXP7lSNM",
        authDomain: "sportapp-cbd6b.firebaseapp.com",
        databaseURL: "https://sportapp-cbd6b.firebaseio.com",
        storageBucket: "sportapp-cbd6b.appspot.com",
        messagingSenderId: "892175710582"
    };

    $(".logout-button").on("click", function () {
        firebase.auth().signOut().then(function () {
                console.log("Logged out!")
            },

            function (error) {
                console.log(error.code);
                console.log(error.message);
            });


    });
