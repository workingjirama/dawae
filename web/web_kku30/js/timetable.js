
function show_timetable(){
    var timetable_content = document.getElementById('timetable_content');
    timetable_content.style.display = 'block';
    if (document.getElementById('t_year').value == "0" || document.getElementById('t_term').value == "0" || document.getElementById('t_major').value == "0"
        || document.getElementById('t_project').value == "0"){
        alert("กรุณาเลือกห้องเรียนที่ต้องการ")
    }
}


$(document).ready(function(){
    $( "#t_major" ).on('change', function() {
        console.log($("#t_major option:selected").text());
        $("#t_major_content").text($("#t_major option:selected").text());
        $("#t_major_content_y1").text($("#t_major option:selected").text());
        $("#t_major_content_y2").text($("#t_major option:selected").text());
        $("#t_major_content_y3").text($("#t_major option:selected").text());
        $("#t_major_content_y4").text($("#t_major option:selected").text());
    });

    $( "#t_project" ).on('change', function() {
        console.log($("#t_project option:selected").text());
        $("#t_project_content").text($("#t_project option:selected").text());
        $("#t_project_content_y1").text($("#t_project option:selected").text());
        $("#t_project_content_y2").text($("#t_project option:selected").text());
        $("#t_project_content_y3").text($("#t_project option:selected").text());
        $("#t_project_content_y4").text($("#t_project option:selected").text());
    });

    $( "#t_year" ).on('change', function() {
        console.log($("#t_year option:selected").text());
        $("#t_year_content").text($("#t_year option:selected").text());
        $("#t_year_content_y1").text($("#t_year option:selected").text());
        $("#t_year_content_y2").text($("#t_year option:selected").text());
        $("#t_year_content_y3").text($("#t_year option:selected").text());
        $("#t_year_content_y4").text($("#t_year option:selected").text());
    });

    $( "#t_term" ).on('change', function() {
        console.log($("#t_term option:selected").text());
        $("#t_term_content").text($("#t_term option:selected").text());
        $("#t_term_content_y1").text($("#t_term option:selected").text());
        $("#t_term_content_y2").text($("#t_term option:selected").text());
        $("#t_term_content_y3").text($("#t_term option:selected").text());
        $("#t_term_content_y4").text($("#t_term option:selected").text());
    });

});






