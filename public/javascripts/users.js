var isCheckedId = false;
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


$('#btn_user_new').on('click', function() {
    window.location.replace("/users/register");
});
$('#checkId').on('click', function() {
    if($('#user_id').val().length < 5) {
        alert('5자 이상');
    } else {
        $.ajax({
            url:'/users/checkid?user_id='+$('#user_id').val(),
            method:'GET',
            success:function(data) {
                if(data == 'OK') {
                    isCheckedId = true;
                    $('#message').text('id 사용 가능');
                } else if(data == 'DUPLICATED') {
                    isCheckedId = false;
                    $('#message').text('id 사용 불가');    
                } else {
                    isCheckedId = false;
                    $('#message').text('error 발생, 재시도..1');
                }
            },
            error:function(err) {
                isCheckedId = false;
                $('#message').text('error 발생, 재시도..2');
            }
        });
    }
});

$('#btn_user_register').on('click', function() {
    if(!isCheckedId) {
        alert('ID 체크해~');
        return;
    }
    if($('#user_name').val().length < 3) {
        alert('이름이 짧아~');
        return;
    }
    if($('#user_email').val()=='' || !re.test($('#user_email').val())){
        alert('이메일 형식 틀려~');
        return;
    }
    //title, contents send!
    $.ajax({
        url: '/users/register/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'user_id':$('#user_id').val(),'user_pwd':$('#user_pwd').val(),'user_name':$('#user_name').val(),'user_email':$('#user_email').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('저장에 성공!');
                window.location.replace("/users/list")
            }else{
                alert('저장에 실패!, 다시 시도해주세요.');
            }
        },
        error:function(err){

            alert('저장에 실패!, 다시 시도해주세요.');
        }
    });
    // window.location.replace("/board/register");
});

$('#btn_user_list').on('click', function() {
    window.location.replace("/users/list");
});

$('#btn_user_update').on('click', function() {
    $.ajax({
        url: '/users/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'user_id':$('#user_id').val(),'user_pwd':$('#user_pwd').val(),'user_name':$('#user_name').val(),'user_email':$('#user_email').val(),'uid':$('#uid').val()}),
        success:function(data){
            console.log(data);
            if(data.status == 'OK'){
                alert('수정되었습니다!');
                window.location.replace("/users/list")
            }else{
                alert('수정에 실패!, 다시 시도해주세요1.');
            }
        },
        error:function(err){

            alert('수정에 실패!, 다시 시도해주세요2.');
        }
    });
    //window.location.replace("/board/list"); 
});

$('#btn_user_delete').on('click', function() {
    $.ajax({
        url: '/users/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'uid':$('#uid').val()}),
            success:function(data){
            if(data.status == 'OK'){
                confirm('삭제하시겠습니까?');
                window.location.replace("/users/list")
            }else{
                alert('삭제할 수 없습니다.');
            }
        },
        error:function(err){

            alert('삭제에 실패!, 다시 시도해주세요.');
        }
    });
    //window.location.replace("/board/list");
});

$('#btnSubmit2').on('click', function() {
    if ($('#searchid').val().length <2){
        alert('검색어 2자 이상!');
        return;
    }else{
        $('#searchKey').submit();
    }
    
});

$('#log_out').on('click',function(){
    window.location.replace('/users/logout');
});
$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});