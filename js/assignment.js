//initialize firebase
firebase.initializeApp(config);


//if loged out move to login-page
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

    } else {
        window.location.href = "index.html";
    }
});



//add/remove element
var allElements = ["same1"];
var randomElements = ["random1"];
var alternElements = ["altern1"];

$(".addbutton").on("click", function () {
    var addbutton = $(this);
    var elementcontainer = addbutton.parent().next();
    var zuweisungcontainer = elementcontainer.parent();
    var element = elementcontainer.children().last();
    var elementnr;
    var elementid;
    var containername = zuweisungcontainer.attr('class');
    if (containername === 'all-container') {
        elementnr = parseInt(element.prop("id").substr(4)) + 1;
        elementid = "same" + elementnr.toString();
        allElements.push(elementid);
    } else if (containername === 'random-container') {
        elementnr = parseInt(element.prop("id").substr(6)) + 1;
        elementid = 'random' + elementnr;
        randomElements.push(elementid);
    } else if (containername === 'alternate-container') {
        elementnr = parseInt(element.prop("id").substr(6)) + 1;
        elementid = 'altern' + elementnr;
        alternElements.push(elementid);
    }
    var elementnrString = "#" + elementnr.toString();
    var newelement;
    if (containername == 'alternate-container') {
        newelement = elementcontainer.append('<div class="all-element" id="altern1"><button type="button" class="close" aria-hidden="true">×</button><input type="text" class="elementnr"></input><div class="date"><label for="Altern-from1"  > Von   </label><input type="text" class="date-from" id="Altern-from1"><label for="Altern-to1"  > Bis   </label><input type="text" class="date-to" id="Altern-to1"></div><button class="addgroupbutton">Gruppe hinzufügen</button><button class="removegroupbutton">Gruppe entfernen </button><div class="group"><p>Gruppe <b>1</b></p><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4 > Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div><div class="group"><p>Gruppe <b>2</b></p><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4 > Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div></div>').find(".all-element").last().prop('id', elementid);
    } else {
        newelement = elementcontainer.append('                <div class="all-element" id="same1"><button type="button" class="close" aria-hidden="true">×</button><input type="text" class="elementnr"></input><div class="date"><label for="All-from1"> Von   </label><input type="text" class="date-from" id="All-from1"><label for="All-to1" > Bis   </label><input type="text" class="date-to" id="All-to1"></div><div class="group"><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4> Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div></div>').find(".all-element").last().prop('id', elementid);
    }
    /*add datepicker*/
    var datefrom = newelement.find(".date .date-from");
    var datefromid = datefrom.prop("id");
    var dateto = newelement.find(".date .date-to");
    var datetoid = dateto.prop("id");
    var newidfrom;
    var newidto;
    var elementnrString = elementnr.toString();
    if (containername == 'random-container') {
        newidfrom = "Random-from" + elementnrString;
        newidto = "Random-to" + elementnrString;
        datefrom.prop('id', newidfrom);
        dateto.prop('id', newidto);
    } else if (containername == 'all-container') {
        newidfrom = "All-from" + elementnrString;
        newidto = "All-to" + elementnrString;
        datefrom.prop('id', newidfrom);
        dateto.prop('id', newidto);

    } else if (containername == 'alternate-container') {
        newidfrom = "Altern-from" + elementnrString;
        newidto = "Altern-to" + elementnrString;
        datefrom.prop('id', newidfrom);
        dateto.prop('id', newidto);
    }


    var picker = new Pikaday({
        field: document.getElementById(newidfrom),
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020]

    });

    var picker = new Pikaday({

        field: document.getElementById(newidto),
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020]

    });

});


//remove Elements
$("body").on("click", ".all-element button.close", function () {
    close = $(this);
    removeelement = close.parent();
    var removeid = removeelement.prop("id");
    var parent = removeelement.parent().parent();
    if (parent.hasClass("all-container")) {
        var index = allElements.indexOf(removeid);
        if (index > -1) {
            allElements.splice(index, 1);
            var counter = 1;
            $.each(allElements, function (i, val) {
                if (counter > index) {
                    var id = $("#" + val).prop("id", removeid);
                    allElements[counter - 1] = removeid;
                    removeid = val;
                }
                counter++;
            })
        }
    } else if (parent.hasClass("random-container")) {
        var index = randomElements.indexOf(removeid);
        if (index > -1) {
            randomElements.splice(index, 1);
            var counter = 1;
            $.each(randomElements, function (i, val) {
                if (counter > index) {
                    var id = $("#" + val).prop("id", removeid);
                    randomElements[counter - 1] = removeid;
                    removeid = val;
                }
                counter++;
            })
        }
    } else {
        var index = alternElements.indexOf(removeid);
        if (index > -1) {
            alternElements.splice(index, 1);
            var counter = 1;
            $.each(alternElements, function (i, val) {
                if (counter > index) {
                    var id = $("#" + val).prop("id", removeid);
                    alternElements[counter - 1] = removeid;
                    removeid = val;
                }
                counter++;
            })
        }
    }
    removeelement.remove();
});
//remove Elements

/*add new group*/
$(".addgroupbutton").on("click", function () {
    var addgroupbutton = $(this);
    var element = addgroupbutton.parent();
    var lastgroup = element.children().last();
    var groupnr = parseInt(lastgroup.find("p b").text()) + 1;
    lastgroup.clone(true).appendTo(element).find("p b").text(groupnr.toString());

});

$(".removegroupbutton").on("click", function () {
    var removegroupbutton = $(this);
    var element = removegroupbutton.parent();
    if (element.find('.group').length > 2)
        element.children().last().remove();

});

//add/remove element


//trims the first word(the day) in the dates in order to be proper dateobjects and therefore easier to compare
function trimFirstWord(original) {
    return original.substr(original.indexOf(" ") + 1);
}

/*checks if there is a collision between the timeperiods. If there is one, it returns false*/
function compareDates(date1Start, date1End, date2Start, date2End) {
    if ((date1Start >= date2End) || (date2Start >= date1End)) {
        return true;
    } else return false;
};



//save everything
$("#saveassignment").on("click", function () {
    var datecollision = false;
    var fromdates = $(".main-container").find('.date-from');
    var todates = $(".main-container").find('.date-to');
    var firstfrom;
    var firstto;
    var firstfromid;
    var firsttoid;
    //check if there is a datecollision 
    for (i = 0; i < fromdates.length;) {
        firstfromid = fromdates.eq(0).prop('id');
        firstfrom = trimFirstWord($('#' + firstfromid).val());
        firsttoid = todates.eq(0).prop('id');
        firstto = trimFirstWord($('#' + firsttoid).val());

        if (firstto < firstfrom) {
            $("#" + firstfromid).addClass("invalid");
            $("#" + firsttoid).addClass("invalid");
            datecollision = true;
        }
        fromdates = fromdates.slice(1);
        todates = todates.slice(1);
        var currentfromdate;
        var currentfromdateid;
        var currenttodate;
        var currenttodateid;
        for (j = 0; j < fromdates.length; j++) {
            currentfromdateid = fromdates.eq(j).prop('id');
            currentfromdate = trimFirstWord($('#' + currentfromdateid).val());
            currenttodateid = todates.eq(j).prop('id');
            currenttodate = trimFirstWord($('#' + currenttodateid).val());
            if (!compareDates(firstfrom, firstto, currentfromdate, currenttodate)) {
                $("#" + firstfromid).addClass("invalid");
                $("#" + firsttoid).addClass("invalid");
                $("#" + currentfromdateid).addClass("invalid");
                $("#" + currenttodateid).addClass("invalid");
                datecollision = true;
            }


        }
    }

    if (datecollision) {
        $("#alert-message").css("display", "inherit");
        return;
    }
    //if there are no collisions remove the invalid class
    fromdates = $(".main-container").find('.date-from');
    todates = $(".main-container").find('.date-to');
    for (j = 0; j < fromdates.length; j++) {
        fromdates.eq(j).removeClass("invalid");
        todates.eq(j).removeClass("invalid");
    }
    /*save sameForAll*/
    var sameRef = firebase.database().ref("Administration/assignment/same");
    sameRef.remove();
    $.each(allElements, function (i, val) {
        var elementid = '#' + val;
        var datefrom = $(elementid).find(".date-from").val();
        var dateto = $(elementid).find(".date-to").val();
        var bsaQuestionary = $(elementid).find(".bsaQuestionary").prop('checked');
        var fitnessQuestionary = $(elementid).find(".fitnessQuestionary").prop('checked');
        var motivationimages = $(elementid).find(".motivationimages").prop('checked');
        var motivationtexts = $(elementid).find(".motivationtexts").prop('checked');
        var moodquery = $(elementid).find(".moodquery").prop('checked');
        var trainingreminder = $(elementid).find(".trainingreminder").prop('checked');
        var assignmentname = $(elementid).find(".elementnr").val();

        sameRef.child(val).set({
            datefrom: datefrom,
            dateto: dateto,
            activities: {
                bsaQuestionary: bsaQuestionary,
                fitnessQuestionary: fitnessQuestionary,
                motivationimages: motivationimages,
                motivationtexts: motivationtexts,
                moodquery: moodquery,
                trainingreminder: trainingreminder,

            },
            assignmentname: assignmentname,
        });
    });

    /*save randomised*/
    var randomRef = firebase.database().ref("Administration/assignment/random");
    randomRef.remove();
    $.each(randomElements, function (i, val) {
        var elementid = '#' + val;
        var datefrom = $(elementid).find(".date-from").val();
        var dateto = $(elementid).find(".date-to").val();
        var bsaQuestionary = $(elementid).find(".bsaQuestionary").prop('checked');
        var fitnessQuestionary = $(elementid).find(".fitnessQuestionary").prop('checked');
        var motivationimages = $(elementid).find(".motivationimages").prop('checked');
        var motivationtexts = $(elementid).find(".motivationtexts").prop('checked');
        var moodquery = $(elementid).find(".moodquery").prop('checked');
        var trainingreminder = $(elementid).find(".trainingreminder").prop('checked');
        var assignmentname = $(elementid).find(".elementnr").val();
        randomRef.child(val).set({
            datefrom: datefrom,
            dateto: dateto,
            activities: {
                bsaQuestionary: bsaQuestionary,
                fitnessQuestionary: fitnessQuestionary,
                motivationimages: motivationimages,
                motivationtexts: motivationtexts,
                moodquery: moodquery,
                trainingreminder: trainingreminder,
            },
            assignmentname: assignmentname,
        });
    });

    /*save alternating*/
    var alternRef = firebase.database().ref("Administration/assignment/altern");
    alternRef.remove();
    $.each(alternElements, function (i, val) {
        var elementid = '#' + val;
        var datefrom = $(elementid).find(".date-from").val();
        var dateto = $(elementid).find(".date-to").val();
        var groups = $(elementid).find('.group');
        var assignmentname = $(elementid).find(".elementnr").val();

        alternRef.child(val).set({
            datefrom: datefrom,
            dateto: dateto,
            assignmentname: assignmentname,
        });
        var groupactive;
        groups.each(function (i, obj) {
            var groupname = 'group' + (i + 1);
            var bsaQuestionary = $(obj).find('.bsaQuestionary').prop('checked');
            var fitnessQuestionary = $(obj).find('.fitnessQuestionary').prop('checked');
            var motivationimages = $(obj).find('.motivationimages').prop('checked');
            var motivationtexts = $(obj).find('.motivationtexts').prop('checked');
            var moodquery = $(obj).find('.moodquery').prop('checked');
            var trainingreminder = $(obj).find('.trainingreminder').prop('checked');
            if (i == 0) groupactive = true;
            else groupactive = false;

            var groupRef = alternRef.child(val).child("groups").child(groupname);
            groupRef.set({
                bsaQuestionary: bsaQuestionary,
                fitnessQuestionary: fitnessQuestionary,
                motivationimages: motivationimages,
                motivationtexts: motivationtexts,
                moodquery: moodquery,
                trainingreminder: trainingreminder,
                groupactive: groupactive,
            });

        });
    });
    $("#alert-message").css("display", "none");
    alert("Speichern erfolgreich");

});
//save everything


//load saved content
function loadassignments(assignmentobject, assignmenttype) {
    var elementnr = 1;
    var elementnrString;
    var elementid;
    var firstassignment;
    if (assignmenttype == "same") {
        var elementcontainer = $(".all-container .all-elements-container");
        var element = $("#same1");
        firstassignment = assignmentobject.same1;
        var datefromid = element.find(".date .date-from").prop("id");
        var datetoid = element.find(".date .date-to").prop("id");
        element.find(".date .date-from").val(firstassignment.datefrom);
        element.find(".date .date-to").val(firstassignment.dateto);
        element.find(".elementnr").val(firstassignment.assignmentname);
        var picker = new Pikaday({
            field: document.getElementById(datefromid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]
        });
        var picker = new Pikaday({
            field: document.getElementById(datetoid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]

        });
        element.find(".bsaQuestionary").prop('checked', firstassignment.activities.bsaQuestionary);
        element.find(".fitnessQuestionary").prop('checked', firstassignment.activities.fitnessQuestionary);
        element.find(".motivationimages").prop('checked', firstassignment.activities.motivationimages);
        element.find(".motivationtexts").prop('checked', firstassignment.activities.motivationtexts);
        element.find(".moodquery").prop('checked', firstassignment.activities.moodquery);
        element.find(".trainingreminder").prop('checked', firstassignment.activities.trainingreminder);
    } else if (assignmenttype == "random") {
        var elementcontainer = $(".random-container .all-elements-container");
        var element = $("#random1");
        firstassignment = assignmentobject.random1;
        var datefromid = element.find(".date .date-from").prop("id");
        var datetoid = element.find(".date .date-to").prop("id");
        element.find(".date .date-from").val(firstassignment.datefrom);
        element.find(".date .date-to").val(firstassignment.dateto);
        element.find(".elementnr").val(firstassignment.assignmentname);
        var picker = new Pikaday({
            field: document.getElementById(datefromid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]
        });
        var picker = new Pikaday({
            field: document.getElementById(datetoid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]

        });
        element.find(".bsaQuestionary").prop('checked', firstassignment.activities.bsaQuestionary);
        element.find(".fitnessQuestionary").prop('checked', firstassignment.activities.fitnessQuestionary);
        element.find(".motivationimages").prop('checked', firstassignment.activities.motivationimages);
        element.find(".motivationtexts").prop('checked', firstassignment.activities.motivationtexts);
        element.find(".moodquery").prop('checked', firstassignment.activities.moodquery);
        element.find(".trainingreminder").prop('checked', firstassignment.activities.trainingreminder);
    } else if (assignmenttype == "altern") {
        var elementcontainer = $(".alternate-container .all-elements-container");
        var element = $("#altern1");
        firstassignment = assignmentobject.altern1;
        var datefromid = element.find(".date .date-from").prop("id");
        var datetoid = element.find(".date .date-to").prop("id");
        element.find(".date .date-from").val(firstassignment.datefrom);
        element.find(".date .date-to").val(firstassignment.dateto);
        element.find(".elementnr").val(firstassignment.assignmentname);
        var picker = new Pikaday({
            field: document.getElementById(datefromid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]
        });
        var picker = new Pikaday({
            field: document.getElementById(datetoid),
            firstDay: 1,
            minDate: new Date(),
            maxDate: new Date(2020, 12, 31),
            yearRange: [2000, 2020]

        });
        var groups = firstassignment.groups;
        var groupnr = 3;
        var groupslength = groups.length;
        //add groups to the frontend if necessary
        for (i = groupslength; i > 2; i--) {
            //add new group
            var lastgroup = element.children().last();
            var groupnr = parseInt(lastgroup.find("p b").text()) + 1;
            lastgroup.clone(true).appendTo(element).find("p b").text(groupnr.toString());
            groupnr++;

        }
        groupnr = 1; //reset groupnr
        $.each(groups, function (key, value) {

            element.find(".group").eq(groupnr).find(".bsaQuestionary").prop('checked', value.bsaQuestionary);
            element.find(".group").eq(groupnr).find(".fitnessQuestionary").prop('checked', value.fitnessQuestionary);
            element.find(".group").eq(groupnr).find(".motivationimages").prop('checked', value.motivationimages);
            element.find(".group").eq(groupnr).find(".motivationtexts").prop('checked', value.motivationtexts);
            element.find(".group").eq(groupnr).find(".moodquery").prop('checked', value.moodquery);
            element.find(".group").eq(groupnr).find(".trainingreminder").prop('checked', value.trainingreminder);
            groupnr++;
        });
    }

    $.each(assignmentobject, function (key, value) {
        if (elementnr > 1) {
            if (assignmenttype == 'same') {
                elementid = "same" + elementnr.toString();
                allElements.push(elementid);
            } else if (assignmenttype == "random") {
                elementid = 'random' + elementnr;
                randomElements.push(elementid);
            } else if (assignmenttype == "altern") {
                elementid = 'altern' + elementnr;
                alternElements.push(elementid);
            }
            var elementnrString = "#" + elementnr.toString();
            var newelement;
            if (assignmenttype == 'altern') {
                newelement = elementcontainer.append('<div class="all-element" id="altern1"><button type="button" class="close" aria-hidden="true">×</button><input type="text" class="elementnr"></input><div class="date"><label for="Altern-from1"  > Von   </label><input type="text" class="date-from" id="Altern-from1"><label for="Altern-to1"  > Bis   </label><input type="text" class="date-to" id="Altern-to1"></div><button class="addgroupbutton">Gruppe hinzufügen</button><button class="removegroupbutton">Gruppe entfernen </button><div class="group"><p>Gruppe <b>1</b></p><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4 > Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div><div class="group"><p>Gruppe <b>2</b></p><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4 > Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div></div>').find(".all-element").last().prop('id', key);

            } else {
                newelement = elementcontainer.append('<div class="all-element" id="same1"><button type="button" class="close" aria-hidden="true">×</button><input type="text" class="elementnr"></input><div class="date"><label for="All-from1"> Von   </label><input type="text" class="date-from" id="All-from1" ><label for="All-to1" > Bis   </label><input type="text" class="date-to" id="All-to1"></div><div class="group"><label  ><input type="checkbox" class = "bsaQuestionary" motivator-nr = 1   > BSA Fragebogen</label><label  ><input type="checkbox" class = "fitnessQuestionary" motivator-nr = 2 > Fitnessfragebogen</label><label  ><input type="checkbox" class = "motivationimages" motivator-nr = 3 > Motivationsbilder</label><label  ><input type="checkbox" class = "motivationtexts" motivator-nr = 4> Motivationstexte</label><label  ><input type="checkbox" class = "moodquery" motivator-nr = 5> Stimmungsabfrage</label><label  ><input type="checkbox" class = "trainingreminder" motivator-nr = 6> Trainingserinnerung</label></div></div>').find(".all-element").last().prop('id', key);

            }
            var datefrom = newelement.find(".date .date-from").val(value.datefrom);
            var datefromid = datefrom.prop("id");
            var dateto = newelement.find(".date .date-to").val(value.dateto);
            var datetoid = dateto.prop("id");
            var newidfrom;
            var newidto;
            newelement.find(".elementnr").val(value.assignmentname);

            if (assignmenttype == 'random') {
                newidfrom = "Random-from" + elementnr;
                newidto = "Random-to" + elementnr;
                datefrom.prop('id', newidfrom);
                dateto.prop('id', newidto);
            } else if (assignmenttype == 'same') {
                newidfrom = "All-from" + elementnr;
                newidto = "All-to" + elementnr;
                datefrom.prop('id', newidfrom);
                dateto.prop('id', newidto);

            } else if (assignmenttype == 'altern') {
                newidfrom = "Altern-from" + elementnr;
                newidto = "Altern-to" + elementnr;
                datefrom.prop('id', newidfrom);
                dateto.prop('id', newidto);
            }
            //add datepicker                     
            var picker = new Pikaday({
                field: document.getElementById(newidfrom),
                firstDay: 1,
                minDate: new Date(),
                maxDate: new Date(2020, 12, 31),
                yearRange: [2000, 2020]

            });

            var picker = new Pikaday({

                field: document.getElementById(newidto),
                firstDay: 1,
                minDate: new Date(),
                maxDate: new Date(2020, 12, 31),
                yearRange: [2000, 2020]

            });

            if (assignmenttype == "same" || assignmenttype == "random") {
                newelement.find(".bsaQuestionary").prop('checked', value.activities.bsaQuestionary);
                newelement.find(".fitnessQuestionary").prop('checked', value.activities.fitnessQuestionary);
                newelement.find(".motivationimages").prop('checked', value.activities.motivationimages);
                newelement.find(".motivationtexts").prop('checked', value.activities.motivationtexts);
                newelement.find(".moodquery").prop('checked', value.activities.moodquery);
                newelement.find(".trainingreminder").prop('checked', value.activities.trainingreminder);
            }

            //add groups of alternating assignment
            if (assignmenttype == "altern") {
                var groups = value.groups;
                var groupnr = 3;
                var groupslength = groups.length;
                //add groups to the frontend if necessary
                for (i = groupslength; i > 2; i--) {
                    //add new group
                    var lastgroup = newelement.children().last();
                    var groupnr = parseInt(lastgroup.find("p b").text()) + 1;
                    lastgroup.clone(true).appendTo(newelement).find("p b").text(groupnr.toString());
                    groupnr++;

                }

                groupnr = 1;
                $.each(groups, function (key, value) {

                    newelement.find(".group").eq(groupnr).find(".bsaQuestionary").prop('checked', value.bsaQuestionary);
                    newelement.find(".group").eq(groupnr).find(".fitnessQuestionary").prop('checked', value.fitnessQuestionary);
                    newelement.find(".group").eq(groupnr).find(".motivationimages").prop('checked', value.motivationimages);
                    newelement.find(".group").eq(groupnr).find(".motivationtexts").prop('checked', value.motivationtexts);
                    newelement.find(".group").eq(groupnr).find(".moodquery").prop('checked', value.moodquery);
                    newelement.find(".group").eq(groupnr).find(".trainingreminder").prop('checked', value.trainingreminder);
                    groupnr++;
                });
            }
        }

        elementnr++;
    })
};

firebase.database().ref('Administration/assignment').once('value').then(function (snapshot) {
    var assignments = snapshot.val();
    loadassignments(assignments.same, "same");
    loadassignments(assignments.random, "random");
    loadassignments(assignments.altern, "altern");
});
//load saved content

$("#All-to1").prop("invalid", true);
