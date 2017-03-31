//initialize firebase
firebase.initializeApp(config);

$("#forgot-password").click(function () {
    $("#forgot-password-modal").modal();
});




firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        window.location.href = "assignment.html";
    }
});






$(".login-btn").on("click", function () {

    var email = $("#email").val();
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        console.log(error.code);
        console.log(error.message);

        if (error.message == "The email address is badly formatted.") {
            $(".emailbadlyformatted").css("display", "inherit");
            $("#falsepassword").css("display", "none");
            $("#email").addClass("invalid");

        } else if (error.message == "The password is invalid or the user does not have a password.") {
            $(".emailbadlyformatted").css("display", "none");
            $("#falsepassword").css("display", "inherit");
            $("#email").addClass("invalid");
            $("#password").addClass("invalid");
        }

    });
});

$("#send-email-link-button").on("click", function () {
    var email1 = $("#email1").val();
    firebase.auth().sendPasswordResetEmail(email1).catch(function (error) {
        if (error.message == "The email address is badly formatted.") {
            $(".emailbadlyformatted").css("display", "inherit");
            $("#nouserrecord").css("display", "none");
            $("#email1").addClass("invalid");

        } else if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
            $("#emailbadlyformatted").css("display", "none");
            $("#nouserrecord").css("display", "inherit");
            $("#email1").addClass("invalid");
        }
        alert(error.message);
        console.log(error.message);
    })

    alert("Email-Link zugeschickt");
});
