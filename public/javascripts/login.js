$('#btn_login').on('click', function() {
    $.ajax({
        url:'/login/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'login_id':$('#login_id').val(),
                              'login_pwd':$('#login_pwd').val()  }),
        success:function(data) {
            console.log(data);
            if(data.status == 'OK') {
                
                $('.login-page').hide();
                $('.user-page').css('visibility', 'visible');
                $('#txt_welcome').text('Welcome ' + data.login_id);
            } else {
                $('#message').text(data.err_msg);
            }
        },
        error:function(err) {
            console.log(err);
            $('#message').text(err.responseText);
        }
    });
});
$('#btn_board').on('click',function(){
    window.location.replace('/board/list');
});

$('#btn_logout').on('click',function(){
    window.location.replace('/board/logout');
});
