function getSubDetail() {
    var subType = document.getElementById('sub_type').value;
    var subYear = document.getElementById('sub_year').value;
    var subTerm = document.getElementById('sub_term').value;
    var subId = document.getElementById('sub_id').value;
    var subThainame = document.getElementById('sub_thainame').value;
    var subEngname = document.getElementById('sub_engname').value;
    var subCredit = document.getElementById('sub_credit').value;
    var subTeacher = document.getElementById('sub_teacher').value;
    var subStudent = document.getElementById('sub_student').value;

    console.log(subType);
    console.log(subYear);
    console.log(subTerm);
    console.log(subId);
    console.log(subThainame);
    console.log(subEngname);
    console.log(subCredit);
    console.log(subTeacher);
    console.log(subStudent);

}

$(document).ready(function () {
    $("#sub_term").on('change', function () {
        $("#sub_term_content").text($("#sub_term option:selected").text());
    });

    $("#sub_thainame").on('change', function () {
        $("#sub_thainame_content").text($('#sub_thainame').val());
    });

    $("#sub_year").on('change', function () {
        $("#sub_year_content").text($('#sub_year').val());
    });

    $("#major").on('change', function () {
        $("#sub_year").attr("value",$("#major").val());
        $("#sub_year").val($("#major").val());
    });

    $("#sub_type").on('change', function () { //Function สำหรับสร้าง option ใน Select tag (ต้อง Query วิชาออกมาจากแพลน อิงตามปีการศึกษา สาขา หลักสูตร)
        switch ($("#sub_type").val()){
            case "1":
                // for(var i = 0 ; i < 10 ; i++){
                //     $('#sub_id').append('<option value="'+ i +'">'+ i +'</option>');
                // }
                $('#sub_id').html('');
                $('#sub_id').append('<option value="0">กรุณาเลือกรหัสวิชา</option>');
                $('#sub_id').append('<option value="002104">002104 วิทยาศาสตร์กายภาพ</option>');
                $('#sub_id').append('<option value="401201">401201 แคลคูลัสสำหรับวิทยาศาสตร์กายภาพ 1</option>');
                $('#sub_id').append('<option value="401202">401202 แคลคูลัสสำหรับวิทยาศาสตร์กายภาพ 2</option>');
                $('#sub_teacher').html('');
                $('#sub_teacher').append('<option value="----">----</option>');
                break;
            case "2":
                $('#sub_id').html('');
                $('#sub_id').append('<option value="000101">000101 ภาษาอังกฤษ 1</option>');
                $('#sub_id').append('<option value="000102">000102 ภาษาอังกฤษ 2</option>');
                $('#sub_id').append('<option value="000103">000103 ภาษาอังกฤษ 3</option>');
                $('#sub_teacher').html('');
                $('#sub_teacher').append('<option value="----">----</option>');
                break;
            case "3":
                $('#sub_id').html('');
                $('#sub_id').append('<option value="313003">313003 การวิเคราะห์และออกแบบระบบ</option>');
                $('#sub_id').append('<option value="312005">312005 เครือข่ายคอมพิวเตอร์</option>');
                $('#sub_id').append('<option value="311003">311003 การเขียนโปรแกรมเชิงวัตถุ</option>');
                break;
            case "4":
                $('#sub_id').html('');
                $('#sub_id').append('<option value="313101">313101 วิทยาการคำนวณ</option>');
                $('#sub_id').append('<option value="313102">313102 โครงข่ายประสาท</option>');
                $('#sub_id').append('<option value="322301">322301 ตรรกะดิจิทัลและระบบฝังตัว</option>');
                break;
        }
    });

    $('#sub_id').on('change',function () { //Function ดึงข้อมูลมา Set ใน Tag input ต่างๆ
        switch ($('#sub_id').val()){
            case "002104":
                $('#sub_thainame').attr("value" , "วิทยาศาสตร์กายภาพ");
                $("#sub_thainame").val("วิทยาศาสตร์กายภาพ");
                $('#sub_engname').attr("value" , "physical Science");
                $("#sub_engname").val("physical Science");
                $('#sub_credit').attr("value" , "3");
                $("#sub_credit").val("3");
                break;
            case "000101":
                $('#sub_thainame').attr("value" , "ภาษาอังกฤษ 1");
                $("#sub_thainame").val("ภาษาอังกฤษ 1");
                $('#sub_engname').attr("value" , "English I");
                $("#sub_engname").val("English I");
                $('#sub_credit').attr("value" , "3");
                $("#sub_credit").val("3");
                break;
        }
    })

    $('#')
});

$("#test").click(function () {
    e.preventDefault()
    var $tt = $("#term").val()
    alert($tt)
});






