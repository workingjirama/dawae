/*globals $:false */
$(document).ready(function() {
    "use strict";
    $('#year').change(function (e) {
        e.preventDefault();
        var year = $('#year').val();
        $.ajax({
            url: '../addprosub/js-year',
            data: {
                'year': year
            },
            type: "get",
            success: function (data) {
                if(data){
                    $('#show-project').html(data);
                }
            }
        });
    });

    $('#strategicissues').change(function (e) {
        e.preventDefault();
        var strategicissues = $('#strategicissues').val();
        $.ajax({
            url: '../addprosub/js-strategicissues',
            data: {
                'strategicissues': strategicissues
            },
            type: "get",
            success: function (data) {
                if(data){
                    $('#show-strategic').html(data);
                }
            }
        });
    });


});