function show_roomtable() {
    var roomtable_content = document.getElementById('show_roomtable');
    roomtable_content.style.display = 'block';
    if (document.getElementById('t_building').value == "0"){
        alert("กรุณาเลือกห้องเรียนที่ต้องการ")
    }
}

$(document).ready(function () {
    $("#t_building").on('change', function () {
        console.log($("#t_building option:selected").text());
        $("#t_building_content").text($("#t_building option:selected").text());
        $("#t_building_content2").text($("#t_building option:selected").text());
    });

    $("#floor").on('change', function () {
        console.log($("#floor option:selected").text());
        $("#floor_content").text($("#floor option:selected").text());
        $("#floor_content2").text($("#floor option:selected").text());

    });


    $("#room_no").on('change', function () {
        console.log($("#room_no option:selected").text());
        $("#room_no_content").text($("#room_no option:selected").text());
        $("#room_no_content2").text($("#room_no option:selected").text());

    });

    $("#t_building").on('change', function () {
        if ($("#t_building").val().length == 0) {
        } else {
            $('#').removeAttr('disabled');
        }
    })

    $("#t_building").on('change', function () {
        if ($("#year").val().length == 0) {
        } else {
            $('#submitcreatetable').removeAttr('disabled');
        }
    })


});






