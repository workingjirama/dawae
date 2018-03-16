$(document).ready(function(){
    $("#term").on('change', function () {
        if ($("#year").val().length == 0 || $("#term").val().length == 0){
        }else{
            $('#submitcreatetable').removeAttr('disabled');
        }
    })
});