$(document).ready(function () {


    /** START  add problemForm **/
    var max_fields1 = 10; //maximum input boxes allowed
    var wrapper1 = $("#problemForm"); //Fields wrapper
    var add_button1 = $("#addProblem"); //Add button ID

    var x1 = 1; //initlal text box count
    $("#problemV").val(x1); //set value in tag input hidden
    $(add_button1).click(function (e) { //on add input button click
        e.preventDefault();
        if (x1 < max_fields1) { //max input box allowed
            x1++; //text box increment
            $("#problemV").val(x1); //set value in tag input hidden
            $(wrapper1).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"problemDetail" + x1 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกผลกระทบ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field1\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper1).on("click", "#remove_field1", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x1--;
        $("#problemV").val(x1); //set value in tag input hidden

    });
    /**  END **/
});

$(document).ready(function () {


    /** START  add problemForm **/
    var max_fields2 = 10; //maximum input boxes allowed
    var wrapper2 = $("#suggestForm"); //Fields wrapper
    var add_button2 = $("#addSuggest"); //Add button ID

    var x2 = 1; //initlal text box count
    $("#suggestV").val(x2); //set value in tag input hidden
    $(add_button2).click(function (e) { //on add input button click
        e.preventDefault();
        if (x2 < max_fields2) { //max input box allowed
            x2++; //text box increment
            $("#suggestV").val(x2); //set value in tag input hidden
            $(wrapper2).append("<div><div class=\"col-md-10 col-sm-10\">" +
                "<input type=\"text\" name=\"suggestDetail" + x2 + "\"" + " value=\"\" class=\"form-control required\" placeholder=\"กรอกผลกระทบ\"></div>" +
                "<div class=\"col-md-1 col-sm-1\" id=\"remove_field2\"><a class=\"btn btn-sm btn-3d btn-danger\"><i class=\"fa fa-minus\"></i>ลบ</a>" +
                "</div></div>"); //add input box
        }
    });

    $(wrapper2).on("click", "#remove_field2", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x2--;
        $("#suggestV").val(x2); //set value in tag input hidden

    });
    /**  END **/
});