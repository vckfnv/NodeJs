var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* board list page */
router.get('/list', function(req, res, next) {
    
    connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_board', function(err,rows){
        if(err){
            res.render('boardList', {'status':'Error'});
        }else{
            //manager login
            if (req.session.uid == 2){
                res.render('boardList',{'status':'OK', 'data':rows, 'manager':'mana','sk':''});
            }else{
                res.render('boardList',{'status':'OK', 'data':rows, 'sk':''});
            }
        }
    });
}); 
 
//board search
router.post('/list/search',function(req,res,next){
    var sql = 'select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from board_db.t_board where title like ?';
    var sql2 = 'select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from board_db.t_board where user_name like ?';
    var values = ['\%'+req.body.searchKeyword+'\%'];
    if (req.body.selectS == 'title'){
        connection.query(sql,values,function(err, rows){
            if(err){
                res.render('boardList', {'status':'Error'});
            }else{
                res.render('boardList',{'status':'OK', 'data':rows, 'sk':req.body.searchKeyword, 'ss':req.body.selectS});
                
            }
        });
    }else{
        connection.query(sql2,values,function(err, rows){
            if(err){
                res.render('boardList', {'status':'Error'});
            }else{
                res.render('boardList',{'status':'OK', 'data':rows, 'sk':req.body.searchKeyword, 'ss':req.body.selectS});
                
            }
        });
        
    }
});
/* board register process ajax*/
router.post('/register/process',function(req,res,next){
    var sql = 'insert into t_board(user_id,user_name,title,content) values(?,?,?,?)';
    var values = [req.session.login_id,req.session.username,req.body.board_title,req.body.board_content];
    connection.query(sql,values,function(err, result){
        if(err){
            res.json({'status':'Error'});
        }else{
            if (result.insertId!=0){
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
            console.log(result);
            
        }
    });
});
/* board Register page */
router.get('/register', function(req, res, next) {
    res.render('boardRegister');
});

/* board title/content page */
router.get('/update', function(req, res, next) {
    console.log(req.query.bid);
    var sq = 'select * from board_db.t_board where bid=?'
    var valu = [req.query.bid];
    connection.query(sq, valu,function(err,rows){
        if(err){
            res.render('boardUpdate', {'status':'Error'});
        }else{
            console.log('send data');
            res.render('boardUpdate',{'status':'OK', 'data':rows[0], 'writer': req.session.login_id});
            
        }
    });
});
//board update
router.post('/update/process',function(req,res,next){
    var sql = 'UPDATE board_db.t_board SET title=?, content=? WHERE bid =?';
    var values = [req.body.board_title, req.body.board_content, req.body.bid];
    connection.query(sql,values,function(err, result){
        if(err){
            res.json({'status':'Error'});
        }else{
            if (result.affectedRows!=0){
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
            
        }
    });
});
//board delete
router.post('/update/delete',function(req,res,next){
    var sql = 'delete from board_db.t_board WHERE bid =?';
    var values = [req.body.bid];
    connection.query(sql,values,function(err, result){
        if(err){
            res.json({'status':'Error'});
        }else{
            if (result.affectedRows!=0){
                res.json({'status':'OK'});
            }else{
                res.json({'status':'Error'});
            }
            
        }
    });
});
//logout
router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
