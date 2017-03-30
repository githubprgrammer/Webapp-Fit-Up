//initialize firebase
firebase.initializeApp(config);


//if loged out move to login-page
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

        } else {
            window.location.href = "index.html";
        }
    });









        $(function() {
            var $select = $('.probabilityinput');
            for (i = 0; i <= 100; i++) {
                value = i + '%';
                $select.append($('<option></option>').val(value).html(value));
            }
        });

jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
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
        $(".ruleaddbutton").on("click", function() {
            var addbutton = $(this);
            var intensifier = addbutton.parent().siblings().last();
            var intensifierContainer = intensifier.parent();
            var phasenr = parseInt(intensifier.find(".phasenr b").text()) + 1;
            var intensifierid = 'phase' + phasenr;
            allrules.push(intensifierid);
            //add new rule
            var newintensifier = intensifierContainer.append("<div class = 'ruleintensifier' id='phase1'><div class='phasenr'>Phase <b>1</b></div><div class='insertdayscontainer'><input type='text' class='insertdays' maxlength='2'><label>Tage</label></div><div class='pushnotecontainer'><p>Push-Note nach jedem</p><input class='pushnoteinput' type='text' maxlength='2'><p>. Training</p></div><div class='probabilitycontainer'><p class='probabilitytext'>Wahrscheinlichkeit:</p><select class='probabilityinput'" +  'size="1" style="height:20px; width:60px;"></select></div> </div>').find(".ruleintensifier").last().prop('id', intensifierid).find(".phasenr b").text(phasenr).parent().parent().find(".pushnoteinput").ForceNumericOnly().parent().parent().find(".insertdays").ForceNumericOnly().parent().parent();
            $(function() {
                var $select = $('#' + intensifierid).find('.probabilityinput');
                for (i = 100; i >= 1; i--) {
                    value = i + '%';
                    $select.append($('<option></option>').val(value).html(value));
                }
            });




        });
        $(".ruleremovebutton").on("click", function() {
            var removebutton = $(this);
            var ruleintensifierContainer = removebutton.parent().parent();
            if (ruleintensifierContainer.children().length > 2){
                ruleintensifierContainer.children().last().remove();
            allrules.pop();
            }
        });


       //save rules
        $("#saveruleintensifier").on("click", function() {
            var ruleintensifierRef = firebase.database().ref("Administration/ruleintensifier");
            //save rules
            ruleintensifierRef.remove();
            $.each(allrules, function(i, val) {
                var ruleId = '#' + val;
                var days = $(ruleId).find(".insertdays").val();
                var nmbrOfPN = $(ruleId).find(".pushnoteinput").val();
                var probability = $(ruleId).find(".probabilityinput").val();

                ruleintensifierRef.child(val).set({
                    days: days,
                    nmbrOfPN: nmbrOfPN,
                    probability: probability,

                });
            });
            $("#alert-message").css("display", "none");
            alert("Speichern erfolgreich");
        });

        //load rules
        firebase.database().ref('Administration/ruleintensifier').once('value').then(function(snapshot) {
            var rules = snapshot.val();
            var rulenr = 1;
            var ruleid;
            var rulecontainer = $(".ruleintensifier-container");
            var firstrule = rules.phase1
            var firstruleid = "#phase1";
            $(phase1).find(".insertdays").val(firstrule.days);
            $(phase1).find(".pushnoteinput").val(firstrule.nmbrOfPN);
            $(phase1).find(".probabilityinput").val(firstrule.probability);


            $.each(rules, function(key, value) {
                if (rulenr > 1) {

                    ruleid = "phase" + rulenr.toString();
                    allrules.push(ruleid);

                    var rulenrString = "#" + rulenr.toString();
                    var newrule;

                    newrule = rulecontainer.append("<div class = 'ruleintensifier' id='phase1'><div class='phasenr'>Phase <b>1</b></div><div class='insertdayscontainer'><input type='text' class='insertdays' maxlength='2'><label>Tage</label></div><div class='pushnotecontainer'><p>Push-Note nach jedem</p><input class='pushnoteinput' type='text' maxlength='2'><p>. Training</p></div><div class='probabilitycontainer'><p class='probabilitytext'>Wahrscheinlichkeit:</p><select class='probabilityinput'" +  'size="1" style="height:20px; width:60px;"></select></div> </div>').find(".ruleintensifier").last().prop('id', ruleid).find(".phasenr b").text(rulenr).parent().parent().find(".pushnoteinput").ForceNumericOnly().parent().parent().find(".insertdays").ForceNumericOnly().parent().parent();
                    $(function() {
                        var $select = newrule.find('.probabilityinput');
                        for (i = 100; i >= 1; i--) {
                            value = i + '%';
                            $select.append($('<option></option>').val(value).html(value));
                        }
                    });

                    newrule.find(".insertdays").val(value.days);
                    newrule.find(".pushnoteinput").val(value.nmbrOfPN);
                    newrule.find(".probabilityinput").val(value.probability);

                }

                rulenr++;
            });
        });
