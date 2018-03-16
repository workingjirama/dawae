$(document).ready(function () {
        var max_fields = 100;
        var max_fields2 = 100;
        var x=1;
        var y=1;
        $("#boxvalue1").val(x);
        $("#boxvalue2").val(y);
        $("#addInput1").click(function (e) {
            e.preventDefault();
            if(x<max_fields) {
                x++;
                $("#gpaInput1").append("<div id='awardform'><br><div class='form-group'><input type='text' name='award_name"+x+"' class='form-control' placeholder='ชื่อผลงานที่ได้รับรางวัล' style='width: 250px;'></div> " + "" +
                    "<div class='form-group'><select style='width: 250px;' name='award_level"+x+"'><option value=''>เลือกระดับ</option><option value=''>ระดับประเทศ</option><option value=''>ระดับภาค</option><option value=''>ระดับจังหวัด</option>" +
                    "</select> </div> <div class='form-group'> <input type='text' name='award_date"+x+"' value='' class='form-control datepicker' data-format='yyyy-mm-dd' " +
                    "data-lang='en' data-RTL='false' placeholder='วันที่แข่งขัน' style='width: 250px;'></div><a class='btn btn-sm btn-danger' id='remove'><i class='fa fa-minus'>ลบ</i></a><br></div>");
            }
            });
        $(wrapper).on("click","#remove",function (e) {
            e.preventDefault();
            $(this).parent('div').remove();
            x--;
            $("#boxvalue1").val(x);
        });

        $("#addInput2").click(function (e) {
            e.preventDefault();
            if(x<max_fields2) {
                $("#gpaInput2").append("<div id='portform'><br><div class='form-group'><input type='text' name='port_name"+y+"' class='form-control' placeholder='ชื่อผลงานที่เข้าร่วมแข่งขัน' style='width: 250px;'></div> " +
                    "<div class='form-group'><select style='width: 250px;' name='port_level"+y+"'><option value=''>เลือกระดับ</option><option value=''>ระดับประเทศ</option><option value=''>ระดับภาค</option><option value=''>ระดับจังหวัด</option>" +
                    "</select> </div> <div class='form-group'> <input type='text' name='port_date"+y+"' value='' class='form-control datepicker' data-format='yyyy-mm-dd' " +
                    "data-lang='en' data-RTL='false' placeholder='วันที่แข่งขัน' style='width: 250px;'> </div><a class='btn btn-sm btn-danger' id='remove2'><i class='fa fa-minus'>ลบ</i></a><br></div>");
            }
        });
        $(wrapper).on("click","#remove2",function (e) {
            e.preventDefault();
            $(this).parent('div').remove();
            y--;
            $("#boxvalue2").val(x);
        });
    });