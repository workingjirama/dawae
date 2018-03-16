/*globals $:false */
$(document).ready(function() {
    "use strict";
    $('#strategic_year').change(function (e) {
        e.preventDefault();
        var year = $('#strategic_year').val();
        $.ajax({
            url: '../customstrategic/strategic-js',
            data: {
                'year': year
            },
            type: "get",
            success: function (data) {
                if(data){
                    $('#show').html(data);
                }
            }
        });
    });
});