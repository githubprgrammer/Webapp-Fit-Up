//initialize firebase
firebase.initializeApp(config);


//if loged out move to login-page
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

    } else {
        window.location.href = "index.html";
    }
});


//load motivationtexts
firebase.database().ref("Administration/motivationText/pos").once('value').then(function (snapshot) {
    var motivationtextspos = snapshot.val();
    $.each(motivationtextspos, function (key, value) {
        $(".motivationtexts-container").append('<div class="loadedtext pos"><button type="button" class="close" data-dismiss="loadedtext" aria-hidden="true">×</button><h5></h5><p></p></div>').find(".loadedtext").last().find("h5").text(value.header).parent().find("p").text(value.text);
    });
});

firebase.database().ref("Administration/motivationText/neg").once('value').then(function (snapshot) {
    var motivationtextsneg = snapshot.val();
    $.each(motivationtextsneg, function (key, value) {
        $(".motivationtexts-container").append('<div class="loadedtext neg"><button type="button" class="close" data-dismiss="loadedtext" aria-hidden="true">×</button><h5></h5><p></p></div>').find(".loadedtext").last().find("h5").text(value.header).parent().find("p").text(value.text);
    });
});
//load motivationtexts

//load images
var storageRef2 = firebase.storage().ref("motivationImage");
var spaceRef;
firebase.database().ref("Administration/motivationImages").once('value').then(function (snapshot) {
    var images = snapshot.val();
    $.each(images, function (key, value) {
        spaceRef = storageRef2.child(value.imagename);
        storageRef2.child(value.imagename).getDownloadURL().then(function (url) {
            $(".image-container").append('<div class="loadedimage"><button type="button" class="close" data-dismiss="loadedtext" aria-hidden="true">×</button><img class="image"  height="37.5" width="50"/></div>').find(".image").last().prop("src", url);
        }).catch(function (error) {

        });
    });
});
//load images

//delete texts
$("body").on("click", ".loadedtext button.close", function () {
    close = $(this);
    loadedtext = close.parent();
    var header = loadedtext.find("h5").text();
    if (loadedtext.hasClass("pos")) {
        var motivationtextRef = firebase.database().ref("Administration/motivationText/pos");
        motivationtextRef.orderByChild("header").equalTo(header).once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                //remove each child
                motivationtextRef.child(childSnapshot.key).remove();
            });
        });

    } else if (loadedtext.hasClass("neg")) {
        var motivationtextRef = firebase.database().ref("Administration/motivationText/neg");
        motivationtextRef.orderByChild("header").equalTo(header).once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                //remove each child
                motivationtextRef.child(childSnapshot.key).remove();
            });
        });
    }
    close.parent().remove();
});
//delete texts

//delete images
$("body").on("click", ".loadedimage button.close", function () {
    close = $(this);
    loadedimage = close.parent();
    var url = loadedimage.find("img").prop("src");
    // Create a reference to the file to delete
    var loadedimageRef = firebase.storage().refFromURL(url);
    var imagenameRef = firebase.database().ref("Administration/motivationImages")
    var imagename = loadedimageRef.name;
    imagenameRef.orderByChild("imagename").equalTo(imagename).once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            //remove each child
            imagenameRef.child(childSnapshot.key).remove();
        });
    });
    // Delete the file
    loadedimageRef.delete().then(function () {}).catch(function (error) {});
    close.parent().remove();
});
//delete images
//save text
$("#savetext-button").on("click", function () {
    var header = $("#motivationTextheader").val();
    var motivationtext = $("#motivationText").val();
    var positivmotivation = $("#positiv").prop("checked");
    var motivationTextposRef = firebase.database().ref("Administration/motivationText/pos");
    var motivationTextnegRef = firebase.database().ref("Administration/motivationText/neg");
    if (positivmotivation) {
        motivationTextposRef.push().set({
            header: header,
            text: motivationtext,
        });
    } else {
        motivationTextnegRef.push().set({
            header: header,
            text: motivationtext,
        });
    }
    alert("Speichern erfolgreich");
});
//save text
//save image
$("#saveimage-button").on("click", function () {


    // Create a root reference
    var storageRef = firebase.storage().ref();
    var imagedatanameRef = firebase.database().ref("Administration/motivationImages");
    var imagename = $(".imagename").text();
    if (imagename != "Durchsuchen") {
        imagedatanameRef.push().set({
            imagename: imagename
        });
    }



    var file = document.getElementById("file-2").files[0];
    var motivationImageRef = storageRef.child("motivationImage/" + file.name);
    motivationImageRef.put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
    });
    alert("Speichern erfolgreich");
});
//save image
