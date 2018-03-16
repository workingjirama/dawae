/**
 * Created by Rin Tohsaka on 22/8/2560.
 */

// $('.add-one').click(function(){
//     $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
//     attach_delete();
// });
//
// //Attach functionality to delete buttons
// function attach_delete(){
//     $('.delete').off();
//     $('.delete').click(function(){
//         console.log("click");
//         $(this).closest('.add').remove();
//     });
// }
//
// $('.c1').click(function(){
//     alert(1);
//     $('.bg1').css("display","block");
//     $('.bg2').css("display","none");
// });
//
// $('.c2').click(function(){
//     alert(2);
//     $('.bg1').css("display","none");
//     $('.bg2').css("display","block");
// });



var data = [{
    "option1" : {
        "0": 11,
        "1": 12,
        "2": 13
    },
    "option2" : {
        "0": 21,
        "1": 22,
        "2": 23
    },
    "option3" : {
        "0": 31,
        "1": 32,
        "2": 33
    }
}]

var count = 1

$(".addForm").on("click" , function() {

    var form = "<div class=\"myBox\" id=\"form" + count + "\">"
    form += "<input type=\"radio\" class=\"check" + count + " \" name=\"check" + count + "\" value=\"option1\" checked=\"checked\"> select 1 "
    form += "<input type=\"radio\" class=\"check" + count + " \" name=\"check" + count + "\" value=\"option2\"> select 2 "
    form += "<input type=\"radio\" class=\"check" + count + " \" name=\"check" + count + "\" value=\"option3\"> select 3 <br>"
    form += "<select class=\"selectData form-control check" + count + "\" style=\"width:90%;\">"
    form += "</select>"
    form += "<input type=\"text\" name=\"prosub_end[]\" class=\"form-control datepicker required\" data-format=\"yyyy-mm-dd\" data-lang=\"en\" data-RTL=\"false\" placeholder=\"วัน-เดือน-ปี\">"
    form += "<span class=\"minus\ style=\" position:absolute;\">"
    form += "<button type=\"button\" class=\"deleteForm\" for=\"form" + count + "\" style=\"border: 1px solid red; background-color:red; color:#fff; float:right;\"> - </button>"
    form += "</span>"
    form += "</div>"
    $(".myForm").append(form)

    var check = "check" + count
    getFirstData(check,data)

    count++
})

$(document).on("click",".deleteForm", function() {
    var id = "#" + $(this).attr("for")
    $(id).remove()
})

$(document).on("click", "input", function() {
    var c = $(this).attr("class")
    var v = $(this).val()
    console.log(c , v)

    getData(c ,v ,data)

})


function getData(c, v, data) {

    if (v == "option1") {
        $('.' + c).empty()
        getFirstData(c,data)
    } else if (v == "option2") {
        $('.' + c).empty()
        getSecondData(c,data)
    } else if (v == "option3") {
        $('.' + c).empty()
        getThirdData(c,data)
    }

}


function getFirstData(c,data) {

    $.each(data[0].option1, function (key, val) {
        $('.' + c).append("<option>" + val + "</option>")
    });

}

function getSecondData(c,data) {

    $.each(data[0].option2, function (key, val) {
        $('.' + c).append("<option>" + val + "</option>")
    });

}

function getThirdData(c,data) {

    $.each(data[0].option3, function (key, val) {
        $('.' + c).append("<option>" + val + "</option>")
    });

}