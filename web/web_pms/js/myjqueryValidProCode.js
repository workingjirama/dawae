/*globals $:false */

$(document).ready(function() {
    "use strict";

    /* ------------------ save year pro ----------------------- */

    $('#procode').blur(function (e) {
        e.preventDefault();
        var procode = $('#procode').val();
        $.ajax({
            url: '../manager/checkprocode',
            data: {
                'procode': procode
            },
            type: "get",
             success: function (data) {
                if (data === 'true') {
                    $('#cprocode').html("<span style='color:#59ba41;'>รหัสโครงการหลักนี้พร้อมใช้งาน</span>");
                    $('#procode').css("border", "2px solid #dddddd");
                }else if (data === 'false'){
                    $('#cprocode').html("<span style='color:#ff6666;'>รหัสโครงการหลักนี้ถูกใช่งานแล้ว !</span>");
                    document.getElementById("procode").value = "";
                }else {
                    $('#cprocode').html("<span style='color:#ff6666;'>รหัสโครงการหลักนี้ไม่ถูกต้อง !</span>");
                    document.getElementById("procode").value = "";
                }
             }
        });
    });

    $('#checkproyear').click(function (e) {
        e.preventDefault();
        var proyear = $('#proyear').val();
        var proname = $('#proname').val();
        var procode = $('#procode').val();
        if (proyear === null) {
            $('#proyear').css("border", "2px dashed #BF6464");
        }else{
            $('#proyear').css("border", "2px solid #dddddd");
        }
        if (proname === "") {
            $('#proname').css("border", "2px dashed #BF6464");
        }else{
            $('#proname').css("border", "2px solid #dddddd");
        }
        if (procode === "") {
            $('#procode').css("border", "2px dashed #BF6464");
        }else{
            $('#procode').css("border", "2px solid #dddddd");
        }


        if (proyear !== null && proname !== "" && procode !== "") {
            $('#submitproyear').submit();
            // $.ajax({
            //     url: '../manager/saveproyear',
            //     data: {
            //         'proyear': proyear,
            //         'proname': proname,
            //         'procode': procode
            //     },
            //     type: "get",
            //     success: function (data) {
            //         if (data === 'true') {
            //             location.reload();
            //
            //         }
            //     }
            // });
        }
    });

    /* ------------------ END save year pro ----------------------- */

    /* ------------------ editpro form ----------------------- */
    $('#strategicname').blur(function (e) {
        e.preventDefault();
        var strategicname = $('#strategicname').val();
        var strategicissuesid = $('#strategicissuesid').val();

        if (strategicissuesid === null) {
            $('#strategicissuesid').css("border", "2px dashed #BF6464");

        } else {
            $('#strategicissuesid').css("border", "2px solid #dddddd");

        }

        if (strategicname === "") {
            $('#strategicname').css("border", "2px dashed #BF6464");

        } else {
            $('#strategicname').css("border", "2px solid #dddddd");
        }

        if (strategicissuesid !== null) {
            $.ajax({
                url: '../responsible/checkstrategic',
                data: {
                    'strategic_name': strategicname,
                    'strategicissuesid': strategicissuesid,
                },
                type: "get",
                success: function (data) {
                    if(strategicname !== "") {
                        if (data === 'true') {
                            $('#cstrategic').html("<span style='color:#59ba41;'>ชื่อกลยุทธ์นี้พร้อมใช้งาน !</span>");
                        } else if (data === 'false') {
                            $('#cstrategic').html("<span style='color:#ff6666;'>ชื่อกลยุทธ์ของประเด็นยุทธศาสตร์นี้ถูกใช้ไปแล้ว !</span>");
                            $('#cstrategic').val("");
                        }
                    }else {
                        $('#cstrategic').html("<span style='color:#59ba41;'></span>");
                    }
                }
            });
        }else{
            $('#cstrategic').html("<span style='color:#ff6666;'>กรุณาเลือกประเด็นยุทธศาสตร์ !</span>");
        }
    });

    $('#summitstrategic').click(function (e) {
        e.preventDefault();
        var strategicname = $('#strategicname').val();
        var strategicissuesid = $('#strategicissuesid').val();

        if (strategicissuesid === null) {
            $('#strategicissuesid').css("border-width", "2px");
            $('#strategicissuesid').css("border-style", "dashed");
            $('#strategicissuesid').css("border-color", "#BF6464");

        } else {
            $('#strategicissuesid').css("border-width", "2px");
            $('#strategicissuesid').css("border-style", "solid");
            $('#strategicissuesid').css("border-color", "#dddddd");

        }

        if (strategicname === "") {
            $('#strategicname').css("border-width", "2px");
            $('#strategicname').css("border-style", "dashed");
            $('#strategicname').css("border-color", "#BF6464");

        } else {
            $('#strategicname').css("border-width", "2px");
            $('#strategicname').css("border-style", "solid");
            $('#strategicname').css("border-color", "#dddddd");
        }

        if (strategicname !== "" && strategicissuesid !== null) {
            $.ajax({
                url: '../responsible/checkstrategic',
                data: {
                    'strategic_name': strategicname,
                    'strategicissuesid': strategicissuesid,
                },
                type: "get",
                success: function (data) {
                    if (data === 'true') {
                        $('#summitstrategic1').submit();
                        // $.ajax({
                        //     url: '../responsible/savestrategic',
                        //     data: {
                        //         'strategicissuesid': strategicissuesid,
                        //         'strategicname': strategicname
                        //     },
                        //     type: "get",
                        //     success: function (data) {
                        //         if (data === 'true') {
                        //             location.reload();
                        //         }
                        //     }
                        // });
                    } else if (data === 'false') {
                        $('#cstrategic').html("<span style='color:#ff6666;'>ชื่อกลยุทธ์ของประเด็นยุทธศาสตร์นี้ถูกใช้ไปแล้ว !</span>");
                        $('#cstrategic').val("");
                    }
                }
            });
        }
    });


    $('#summitstrategicissues').on('submit', function (e) {
        e.preventDefault();
        var strategicissuesname = $('#strategicissuesname').val();
        if (strategicissuesname === "") {
            $('#strategicissuesname').css("border", "2px dashed #BF6464");
        } else {
            this.submit();
            // $.ajax({
            //     url: '../responsible/savestrategicissues',
            //     data: {
            //         'strategicissuesname': strategicissuesname
            //     },
            //     type: "get",
            //     success: function (data) {
            //         if (data === 'true') {
            //             var hash = '#strategicissueshash';
            //             $('html, body').animate({
            //                 scrollTop: $(hash).offset().top
            //             }, 1000, function(){
            //                 window.location.hash = hash;
            //             });
            //             location.reload();
            //
            //         }
            //     }
            // });
        }
    });


    $('#summitgovernance1').on('submit', function (e) {
        e.preventDefault();
        var governancename = $('#governancename').val();
        if (governancename === "") {
            $('#governancename').css("border", "2px dashed #BF6464");
        } else {
            this.submit();
            // $.ajax({
            //     url: '../responsible/savegovernance',
            //     type: "post",
            //     data: {
            //         '_csrf ':'<?=Yii::$app->request->getCsrfToken()?>',
            //         'governancename': governancename
            //     },
            //     // success: function (data) {
            //     //     if (data === 'true') {
            //     //         swal("", "บันทึกสำเร็จ", "success");
            //     //         location.reload();
            //     //
            //     //     }
            //     // }
            // });
        }
    });
    /* ------------------ END editpro form ----------------------- */



    /* ----------------- Save Form project ------------------------*/

    $('#saveproject11').click(function (e) {
        e.preventDefault();

        var prosubName = $("input[name=prosubName]").val();
        var prosubCode = $("input[name=prosubCode]").val();
        var prosubYears = $("#prosubYears").val();
        var project = $("#project").val();
        var prosubType = $("#prosubType").val();
        var prosubDeparment = $("#prosubDeparment").val();
        var datestart = $("input[name=datestart]").val();
        var dateend = $("input[name=dateend]").val();
        var strategic_issues = $("#strategic_issues").val();
        var strategic = $("#strategic").val();

        if (prosubName === "") {
            $("input[name=prosubName]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=prosubName]").css("border", "2px solid #dddddd");
        }
        if (prosubCode === "") {
            $("input[name=prosubCode]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=prosubCode]").css("border", "2px solid #dddddd");
        }
        if (prosubYears === null) {
            $("#prosubYears").css("border", "2px dashed #BF6464");
        }else{
            $("#prosubYears").css("border", "2px solid #dddddd");
        }
        if (project === null) {
            $("#project").css("border", "2px dashed #BF6464");
        }else{
            $("#project").css("border", "2px solid #dddddd");
        }
        if (prosubType === null) {
            $("#prosubType").css("border", "2px dashed #BF6464");
        }else{
            $("#prosubType").css("border", "2px solid #dddddd");
        }
        if (prosubDeparment === null) {
            $("#prosubDeparment").css("border", "2px dashed #BF6464");
        }else{
            $("#prosubDeparment").css("border", "2px solid #dddddd");
        }


        if (datestart === "") {
            $("input[name=datestart]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=datestart]").css("border", "2px solid #dddddd");
        }
        if (dateend === "") {
            $("input[name=dateend]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=dateend]").css("border", "2px solid #dddddd");
        }

        if (datestart === "") {
            $("input[name=datestart]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=datestart]").css("border", "2px solid #dddddd");
        }
        if (dateend === "") {
            $("input[name=dateend]").css("border", "2px dashed #BF6464");
        }else{
            $("input[name=dateend]").css("border", "2px solid #dddddd");
        }



        // $.ajax({
        //     url: '../responsible/saveprojectform',
        //     data: {
        //         'prosub_name': prosubName,
        //         'prosub_code': prosubCode,
        //         'pms_project_project_id': project,
        //         'prosub_type': prosubType,
        //         'prosub_deparment': prosubDeparment,
        //         'prosub_timestart': datestart,
        //         'prosub_timeend': dateend,
        //         'strategic_strategic_id': strategic
        //     },
        //     type: "get",
        //     success: function (data) {
        //         if (data === 'true') {
        //             location.reload();
        //         }
        //     }
        // });

    });


});