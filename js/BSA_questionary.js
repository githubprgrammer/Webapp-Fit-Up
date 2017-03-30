//initialize firebase
firebase.initializeApp(config);


//if loged out move to login-page
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

    } else {
        window.location.href = "index.html";
    }
});

//load from database
firebase.database().ref('Administration/bsa/questionaryPeriodweeks').once('value').then(function (snapshot) {
    var period = snapshot.val();
    $(".bsaPeriod").val(period);
});
//load from database
//save
$("#savebsa").on("click", function () {


    var bsaRef = firebase.database().ref("Administration/bsa");
    var questionaryPeriodweeks = $(".bsaPeriod").val();
    bsaRef.set({
        questionaryPeriodweeks,
    });
    alert("Speichern erfolgreich");
});
//save
