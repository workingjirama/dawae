/*globals $:false */
$(document).ready(function() {
    "use strict";
    $('#governance_year').change(function (e) {
        e.preventDefault();
        var year = $('#governance_year').val();
        $.ajax({
            url: '../customgovernance/governance-js',
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