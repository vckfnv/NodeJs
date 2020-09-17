$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});

$('#btn_board_register').on('click', function() {
    //title, contents send!
    $.ajax({
        url: '/board/register/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val()}),
        success:function(data){
            if(data.status == 'OK'){ 
                alert('저장에 성공!');
                window.location.replace("/board/list")
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

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_board_update').on('click', function() {
    $.ajax({
        url: '/board/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val(), 'bid':$('#bid').val()}),
        success:function(data){
            if(data.status == 'OK'){
                alert('수정되었습니다!');
                window.location.replace("/board/list")
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

$('#btn_board_delete').on('click', function() {
    $.ajax({
        url: '/board/update/delete',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        //json형태로 서버로 보내주는거 : ejs에서 정해놓은거 순서대로!
        data:JSON.stringify({'board_title':$('#board_title').val(), 'board_content':$('#board_content').val(),'bid':$('#bid').val()}),
        success:function(data){
            if(data.status == 'OK'){
                confirm('삭제하시겠습니까?');
                window.location.replace("/board/list")
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
    window.location.replace('/board/logout');
});
$('#useredit').on('click',function(){
    window.location.replace('/users/list');
});