/*globals $:false */
$(document).ready(function() {
    "use strict";
    $('#strategic_issues').change(function (e) {
        e.preventDefault();
        var strategicissuesid = $('#strategic_issues').val();
        if (strategicissuesid !== "" || strategicissuesid !== null) {
            $.ajax({
                url: '../responsible/selectstrategic',
                data: {
                    'strategicissuesid': strategicissuesid
                },
                type: "get",
                success: function (data) {
                    if (data) {
                        $('#strategic').html(data);
                    }
                }
            });
        }
    });


    $('#prosubYears').change(function (e) {
        e.preventDefault();
        var prosubYears = $('#prosubYears').val();
        if (prosubYears !== "" || prosubYears !== null) {
            $.ajax({
                url: '../responsible/selectproyear',
                data: {
                    'prosubYears': prosubYears
                },
                type: "get",
                success: function (data) {
                    if (data) {
                        $('#project').html(data);
                    }
                }
            });
        }
    });

    //getBudgetMain
    $( document ).ready(function() {

        // var budgetmain =  $('#budgetmain1').val();
        // $.ajax({
        //     url: '../responsible/selectbudgetsub',
        //     data: {
        //         'budgetmain': budgetmain
        //     },
        //     type: "get",
        //     success: function(data){
        //         if(data){
        //             //alert(data);
        //             $('#bg').html(data);
        //         }
        //     }
        // });
    });


    // $('#budgetmain1').click(function () {
    //     var budgetmain1 =  1;
    //         $.ajax({
    //             url: '../responsible/selectbudgetsub',
    //             data: {
    //                 'budgetmain': budgetmain1
    //             },
    //             type: "get",
    //             success: function(data){
    //                 if(data){
    //                     $('#bg1').html(data);
    //                 }
    //             }
    //         });
    // });
    // $('#budgetmain2').click(function () {
    //     var budgetmain2 =  2;
    //     $.ajax({
    //         url: '../responsible/selectbudgetsub',
    //         data: {
    //             'budgetmain': budgetmain2
    //         },
    //         type: "get",
    //         success: function(data){
    //             if(data){
    //                 $('#bg2').html(data);
    //             }
    //         }
    //     });
    // });



    $('#budgetmain3').click(function () {
        var data = "<input type=\"text\" name=\"budgetsubselect[]\" class=\"form-control required\" placeholder=\"กรอกชื่อรายการงบประมาณ\">";
        $('#bg').html(data);

    });

});