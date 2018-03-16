
$('#byAbstract').click(function(){
    $.ajax({
        url: '../tagging/abstract',
        type: 'post',
        data: {
            tool_data:$("#project-tools").select2("val"),
            theory_data:$("#project-theorys").select2("val"),
            keyword:$('#project-abstract').val(),
            _csrf : yii.getCsrfToken()
        },
        success: function (data) {
            // $('#project-projecttypes').val(data.type).trigger('change');
            console.log(data)
            $('#project-tools').val(data.tool).trigger('change');
            $('#project-theorys').val(data.theory).trigger('change');
        }
    });

})
$('#byProposal').click(function(){
    $.ajax({
        url: '../tagging/proposal',
        type: 'post',
        data: {
            tool_data:$("#project-tools").select2("val"),
            theory_data:$("#project-theorys").select2("val"),
            _csrf : yii.getCsrfToken()
        },
        success: function (data) {
            // $('#project-projecttypes').val(data.type).trigger('change');
            console.log(data)
            $('#project-tools').val(data.tool).trigger('change');
            $('#project-theorys').val(data.theory).trigger('change');
        }
    });

})