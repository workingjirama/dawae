/** START **/

$(document).ready(function () {

    /** START  add relevant **/
    $("#check").click(function () {
        var e = $("#check").val();
        if (e == 1) {
            $("#position").slideDown(500);
            $("#relevant").slideDown(500);
            $("#check").val("0");
        }
        if (e == 0) {
            $("#position").slideUp(500);
            $("#relevant").slideUp(500);
            $("#check").val("1");
        }
    });
    /** END **/


});


$(document).ready(function () {

    /** START  add purpose **/
    var max_fields = 10; //maximum input boxes allowed
    var wrapper = $("#purposeForm"); //Fields wrapper
    var add_button = $("#addPurpose"); //Add button ID

    var x = 1; //initlal text box count
    $("#purposeV").val(x); //set value in tag input hidden

    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $("#purposeV").val(x); //set value in tag input hidden
            $(wrapper).append("<div><div class=\"col-md-10 col-sm-10\"><input type=\"text\" name=\"purposeDetail" + x + "\"" + " value=\"\"" +
                "class=\"form-control required\"placeholder=\"กรอกวัตถุประสงค์\"> </div> <div id='remove_field' class=\"col-md-1 col-sm-1\"> " +
                "<a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a> </div></div>"); //add input box
        }
    });

    $(wrapper).on("click", "#remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
        $("#purposeV").val(x); //set value in tag input hidden
    });

    /**  END **/
});

$(document).ready(function () {

    /** START  add indicator **/
    var max_fields2 = 10; //maximum input boxes allowed
    var wrapper2 = $("#indicatorForm"); //Fields wrapper
    var add_button2 = $("#addIndicator"); //Add button ID

    var x2 = 1; //initlal text box count
    $("#indicatorV").val(x2); //set value in tag input hidden
    $(add_button2).click(function (e) { //on add input button click
        e.preventDefault();
        if (x2 < max_fields2) { //max input box allowed
            x2++; //text box increment
            $("#indicatorV").val(x2); //set value in tag input hidden
            $(wrapper2).append("<div><div class=\"col-md-7 col-sm-7\">" +
                "<input type=\"text\" name=\"indicator" + x2 + "\"" + " value=\"\"class=\"form-control required\" placeholder=\"กรอกใส่ตัวชี้วัด\"></div>" +
                "<div class=\"col-md-3 col-sm-3\"><input type=\"text\" name=\"goalValue" + x2 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกค่าเป้าหมาย\">" +
                "</div><div id='remove_field2' class=\"col-md-1 col-sm-1\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper2).on("click", "#remove_field2", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x2--;
        $("#indicatorV").val(x2); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add place **/
    var max_fields3 = 10; //maximum input boxes allowed
    var wrapper3 = $("#placeForm"); //Fields wrapper
    var add_button3 = $("#addPlace"); //Add button ID

    var x3 = 1; //initlal text box count
    $("#placeV").val(x3); //set value in tag input hidden
    $(add_button3).click(function (e) { //on add input button click
        e.preventDefault();
        if (x3 < max_fields3) { //max input box allowed
            x3++; //text box increment
            $("#placeV").val(x3); //set value in tag input hidden
            $(wrapper3).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"place" + x3 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกชื่อสถานที่\"></div>" +
                "<div class=\"col-md-1 col-sm-1\"  id=\"remove_field3\">" +
                "<a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a></div></div>"); //add input box
        }
    });

    $(wrapper3).on("click", "#remove_field3", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x3--;
        $("#placeV").val(x3); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add costPlan **/
    var max_fields4 = 10; //maximum input boxes allowed
    var wrapper4 = $("#costPlanForm"); //Fields wrapper
    var add_button4 = $("#addCost"); //Add button ID

    var x4 = 1; //initlal text box count
    $("#costV").val(x4); //set value in tag input hidden
    $(add_button4).click(function (e) { //on add input button click
        e.preventDefault();
        if (x4 < max_fields4) { //max input box allowed
            x4++; //text box increment
            $("#costV").val(x4); //set value in tag input hidden
            $(wrapper4).append("<div><div class=\"col-md-4 col-sm-4\"> <input type=\"text\" name=\"costDetail" + x4 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกชื่อรายการ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\"><center>เป็นเงิน</center></div>" +
                "<div class=\"col-md-4 col-sm-4\"><input type=\"text\" name=\"costPrice" + x4 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกจำนวนเงิน\"> </div>" +
                "<div class=\"col-md-1 col-sm-1\"><center>บาท</center></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field4\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper4).on("click", "#remove_field4", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x4--;
        $("#costV").val(x4); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add resultExpect **/
    var max_fields5 = 10; //maximum input boxes allowed
    var wrapper5 = $("#resultExpectForm"); //Fields wrapper
    var add_button5 = $("#addResultExpect"); //Add button ID

    var x5 = 1; //initlal text box count
    $("#placeV").val(x5); //set value in tag input hidden
    $(add_button5).click(function (e) { //on add input button click
        e.preventDefault();
        if (x5 < max_fields5) { //max input box allowed
            x5++; //text box increment
            $("#resultExpectV").val(x5); //set value in tag input hidden
            $(wrapper5).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"resultDetail" + x5 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกผลที่คาดว่าจะได้รับ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field5\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper5).on("click", "#remove_field5", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x5--;
        $("#resultExpectV").val(x5); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add effectBefore **/
    var max_fields6 = 10; //maximum input boxes allowed
    var wrapper6 = $("#effectBeforeForm"); //Fields wrapper
    var add_button6 = $("#addEffectBefore"); //Add button ID

    var x6 = 1; //initlal text box count
    $("#effectBeforeV").val(x6); //set value in tag input hidden
    $(add_button6).click(function (e) { //on add input button click
        e.preventDefault();
        if (x6 < max_fields6) { //max input box allowed
            x6++; //text box increment
            $("#effectBeforeV").val(x6); //set value in tag input hidden
            $(wrapper6).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"effectBDetail" + x6 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกผลกระทบ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field6\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper6).on("click", "#remove_field6", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x6--;
        $("#effectBeforeV").val(x6); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add problemBefore **/
    var max_fields7 = 10; //maximum input boxes allowed
    var wrapper7 = $("#problemBeforeForm"); //Fields wrapper
    var add_button7 = $("#addProblemBefore"); //Add button ID

    var x7 = 1; //initlal text box count
    $("#problemBeforeV").val(x7); //set value in tag input hidden
    $(add_button7).click(function (e) { //on add input button click
        e.preventDefault();
        if (x7 < max_fields7) { //max input box allowed
            x7++; //text box increment
            $("#problemBeforeV").val(x7); //set value in tag input hidden
            $(wrapper7).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"problemBDetail" + x7 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกอุปสรรค\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field7\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper7).on("click", "#remove_field7", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x7--;
        $("#problemBeforeV").val(x7); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add suggestBefore **/
    var max_fields8 = 10; //maximum input boxes allowed
    var wrapper8 = $("#suggestBeforeForm"); //Fields wrapper
    var add_button8 = $("#addSuggestBefore"); //Add button ID

    var x8 = 1; //initlal text box count
    $("#suggestBeforeV").val(x8); //set value in tag input hidden
    $(add_button8).click(function (e) { //on add input button click
        e.preventDefault();
        if (x8 < max_fields8) { //max input box allowed
            x8++; //text box increment
            $("#suggestBeforeV").val(x8); //set value in tag input hidden
            $(wrapper8).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"suggestBDetail" + x8 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกผลกระทบ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field8\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper8).on("click", "#remove_field8", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x8--;
        $("#suggestBeforeV").val(x8); //set value in tag input hidden

    });
    /**  END **/
});




$(document).ready(function () {
    $('.addel').addel({
        events: {
            added: function (event) {
                console.log('Added ' + event.added.length);
            }
        }
    }).on('addel:delete', function (event) {
        if (!window.confirm('Are you absolutely positive you would like to delete: ' + '"' + event.target.find(':input').val() + '"?')) {
            console.log('Deletion prevented!');
            event.preventDefault();
        }
    });
});