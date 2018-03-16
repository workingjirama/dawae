

// function showHeader(){
//     var content = document.getElementById('content');
//     content.style.display = 'block';
// }

$(document).ready(function(){
    $( "#term" ).on('change', function() {
        $("#cs_term_content").text($("#term option:selected").text());
        $("#cs_vip_term_content").text($("#term option:selected").text());
        $("#ict_term_content").text($("#term option:selected").text());
        $("#ict_vip_term_content").text($("#term option:selected").text());
        $("#gis_term_content").text($("#term option:selected").text());
        $("#gis_vip_term_content").text($("#term option:selected").text());
    });
    $( "#year" ).on('change', function() {
        $("#cs_year_content").text($("#year option:selected").text());
        $("#cs_vip_year_content").text($("#year option:selected").text());
        $("#ict_year_content").text($("#year option:selected").text());
        $("#ict_vip_year_content").text($("#year option:selected").text());
        $("#gis_year_content").text($("#year option:selected").text());
        $("#gis_vip_year_content").text($("#year option:selected").text());
    });
    $( "#studyYear" ).on('change', function() {
        $("#cs_syear_content").text($("#studyYear option:selected").text());
        $("#cs_vip_syear_content").text($("#studyYear option:selected").text());
        $("#ict_syear_content").text($("#studyYear option:selected").text());
        $("#ict_vip_syear_content").text($("#studyYear option:selected").text());
        $("#gis_syear_content").text($("#studyYear option:selected").text());
        $("#gis_vip_syear_content").text($("#studyYear option:selected").text());
    });
    $("#year").on('change', function () {
       if ($("#year").val().length == 0 || $("#term").val().length == 0 || $("#studyYear").val().length == 0){
       }else{
           $('#submitcreatetable').removeAttr('disabled');
       }
    })

    $("#term").on('change', function () {
        if ($("#year").val().length == 0 || $("#term").val().length == 0 || $("#studyYear").val().length == 0){
        }else{
            $('#submitcreatetable').removeAttr('disabled');
        }
    })

    $("#studyYear").on('change', function () {
        if ($("#year").val().length == 0 || $("#term").val().length == 0 || $("#studyYear").val().length == 0){
        }else{
            $('#submitcreatetable').removeAttr('disabled');
        }
    })
});






