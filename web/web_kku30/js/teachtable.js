function showTeachTable(){
    var show_teachtable = document.getElementById('show_teachtable');
    show_teachtable.style.display = 'block';
    if (document.getElementById('t_table').value == "0" || document.getElementById('t_year').value == "0" || document.getElementById('t_term').value == "0"){
        alert("กรุณาเลือกห้องเรียนที่ต้องการ")
    }
}

$(document).ready(function(){
    $( "#t_table" ).on('change', function() {
        console.log($("#t_table option:selected").text());
        $("#t_table_content").text($("#t_table option:selected").text());
    });

    $( "#t_year" ).on('change', function() {
        console.log($("#t_year option:selected").text());
        $("#t_year_content").text($("#t_year option:selected").text());
    });


    $( "#t_term" ).on('change', function() {
        console.log($("#t_term option:selected").text());
        $("#t_term_content").text($("#t_term option:selected").text());
    });


});






