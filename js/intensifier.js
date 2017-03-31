//initialize firebase
firebase.initializeApp(config);


//if loged out move to login-page
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

    } else {
        window.location.href = "index.html";
    }
});


$(function () {
    var $select = $('.probabilityinput');
    for (i = 0; i <= 100; i++) {
        value = i + '%';
        $select.append($('<option></option>').val(value).html(value));
    }
});

jQuery.fn.ForceNumericOnly =
    function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };
$(".pushnoteinput").ForceNumericOnly();
$(".insertdays").ForceNumericOnly();


var allrules = ["phase1"];
$(".ruleaddbutton").on("click", function () {
    var addbutton = $(this);
    var intensifier = addbutton.parent().siblings().last();
    var intensifierContainer = intensifier.parent();
    var phasenr = parseInt(intensifier.prop("id").substr(5)) + 1;
    var intensifierid = 'phase' + phasenr;
    allrules.push(intensifierid);
    //add new rule
    var newintensifier = intensifierContainer.append("<div class = 'ruleintensifier' id='phase1'><button type='button' class='close' data-dismiss='ruleintensifier' aria-hidden='true'>×</button><input type='text' class='phasenr'></input><div class='insertdayscontainer'><input type='text' class='insertdays' maxlength='2'><label>Tage</label></div><div class='pushnotecontainer'><p>Push-Note nach jedem</p><input class='pushnoteinput' type='text' maxlength='2'><p>. Training</p></div><div class='probabilitycontainer'><p class='probabilitytext'>Wahrscheinlichkeit:</p><select class='probabilityinput'" + 'size="1" style="height:20px; width:60px;"></select></div> </div>').find(".ruleintensifier").last().prop('id', intensifierid).find(".phasenr b").text(phasenr).parent().parent().find(".pushnoteinput").ForceNumericOnly().parent().parent().find(".insertdays").ForceNumericOnly().parent().parent();
    $(function () {
        var $select = $('#' + intensifierid).find('.probabilityinput');
        for (i = 100; i >= 1; i--) {
            value = i + '%';
            $select.append($('<option></option>').val(value).html(value));
        }
    });




});

//remove rules
$("body").on("click", ".ruleintensifier button.close", function () {
    close = $(this);
    rule = close.parent();
    var removeid = rule.prop("id");
    var index = allrules.indexOf(removeid);
    if (index > -1) {
        allrules.splice(index, 1);
        var counter = 1;
        $.each(allrules, function (i, val) {
            if (counter > index) {
                var id = $("#" + val).prop("id", removeid);
                allrules[counter - 1] = removeid;
                removeid = val;
            }
            counter++;
        })
    }
    rule.remove();
});
//remove rules

//save rules
$("#saveruleintensifier").on("click", function () {
    //check if there are empty date fields
    var emptyfield = false;
    $.each(allrules, function (i, val) {
        var ruleId = '#' + val;
        var days = $(ruleId).find(".insertdays").prop("required", true).val();
        var nmbrOfPN = $(ruleId).find(".pushnoteinput").prop("required", true).val();
        if (!$.trim(days) || !$.trim(nmbrOfPN)) {
            if (!$.trim(days)) {
                $(ruleId).find(".insertdays").addClass("invalid");
            }
            if (!$.trim(nmbrOfPN)) {
                $(ruleId).find(".pushnoteinput").addClass("invalid");
            }
            emptyfield = true;
        }

    });

    if (emptyfield) {
        $("#alert-message").css("display", "inherit");
        return;
    }

    //remove red background 
    $.each(allrules, function (i, val) {
        var ruleId = '#' + val;
        $(ruleId).find(".insertdays").removeClass("invalid");
        $(ruleId).find(".pushnoteinput").removeClass("invalid");
    });
    //remove red background 


    var ruleintensifierRef = firebase.database().ref("Administration/ruleintensifier");
    ruleintensifierRef.remove();
    $.each(allrules, function (i, val) {
        var ruleId = '#' + val;
        var days = $(ruleId).find(".insertdays").val();
        var nmbrOfPN = $(ruleId).find(".pushnoteinput").val();
        var probability = $(ruleId).find(".probabilityinput").val();
        var rulename = $(ruleId).find(".phasenr").val();
        ruleintensifierRef.child(val).set({
            days: days,
            nmbrOfPN: nmbrOfPN,
            probability: probability,
            rulename: rulename,

        });
    });
    $("#alert-message").css("display", "none");
    alert("Speichern erfolgreich");
});
//save rules


//load rules
firebase.database().ref('Administration/ruleintensifier').once('value').then(function (snapshot) {
    var rules = snapshot.val();
    var rulenr = 1;
    var ruleid;
    var rulecontainer = $(".ruleintensifier-container");
    var firstrule = rules.phase1
    var firstruleid = "#phase1";
    $(phase1).find(".insertdays").val(firstrule.days);
    $(phase1).find(".pushnoteinput").val(firstrule.nmbrOfPN);
    $(phase1).find(".probabilityinput").val(firstrule.probability);
    $(phase1).find(".phasenr").val(firstrule.rulename);



    $.each(rules, function (key, value) {
        if (rulenr > 1) {

            ruleid = "phase" + rulenr.toString();
            allrules.push(ruleid);

            var rulenrString = "#" + rulenr.toString();
            var newrule;

            newrule = rulecontainer.append("<div class = 'ruleintensifier' id='phase1'><button type='button' class='close' data-dismiss='ruleintensifier' aria-hidden='true'>×</button><input type='text' class='phasenr'></input><div class='insertdayscontainer'><input type='text' class='insertdays' maxlength='2'><label>Tage</label></div><div class='pushnotecontainer'><p>Push-Note nach jedem</p><input class='pushnoteinput' type='text' maxlength='2'><p>. Training</p></div><div class='probabilitycontainer'><p class='probabilitytext'>Wahrscheinlichkeit:</p><select class='probabilityinput'" + 'size="1" style="height:20px; width:60px;"></select></div> </div>').find(".ruleintensifier").last().prop('id', ruleid).find(".pushnoteinput").ForceNumericOnly().parent().parent().find(".insertdays").ForceNumericOnly().parent().parent();
            $(function () {
                var $select = newrule.find('.probabilityinput');
                for (i = 100; i >= 1; i--) {
                    value = i + '%';
                    $select.append($('<option></option>').val(value).html(value));
                }
            });

            newrule.find(".insertdays").val(value.days);
            newrule.find(".pushnoteinput").val(value.nmbrOfPN);
            newrule.find(".probabilityinput").val(value.probability);
            newrule.find(".phasenr").val(value.rulename);

        }

        rulenr++;
    });
});
