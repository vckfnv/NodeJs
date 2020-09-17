var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

/* user list page */
router.get('/list', function(req, res, next) {
    
    connection.query('select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from t_user', function(err,rows){
        if(err){
            res.render('userList', {'status':'Error'});
        }else{
            res.render('userList',{'status':'OK', 'data':rows, 'sk':''});
        }
    });
}); 
//user search
router.post('/list/search',function(req,res,next){
    var sql = 'select *, date_format(cdate, \'%Y-%m-%d %H:%i:%s\') as cdate2 from board_db.t_user where login_id like ?';
    var values = ['\%'+req.body.searchKeyword+'\%'];
    connection.query(sql,values,function(err, rows){
        if(err){
            res.render('userList', {'status':'Error'});
        }else{
            res.render('userList',{'status':'OK', 'data':rows, 'sk':req.body.searchKeyword});
            
        }
    });
});
router.get('/checkid', function(req, res, next) {
    var sql = 'select uid from board_db.t_user where login_id=?';
    var values = req.query.user_id;
    connection.query(sql,values, 
            function(err, row, field) {
                if(err){
                    res.send('ERROR');
                } else {
                    if(row.length > 0) {
                        res.send('DUPLICATED');
                    } else {
                        res.send('OK');
                    }
                }
    });
}); 
/* user register process ajax*/
router.post('/register/process',function(req,res,next){
    var sql = 'insert into t_user(login_id,login_pwd,user_name,email) values(?,?,?,?)';
    var values = [req.body.user_id,req.body.user_pwd,req.body.user_name,req.body.user_email];
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
/* user Register page */
router.get('/register', function(req, res, next) {
    res.render('userRegister');
});

/* user information page */
router.get('/update', function(req, res, next) {
    console.log(req.query.uid);
    var sq = 'select * from board_db.t_user where uid=?'
    var valu = [req.query.uid];
    connection.query(sq, valu,function(err,rows){
        if(err){
            res.render('userUpdate', {'status':'Error'});
        }else{
            console.log('send data');
            res.render('userUpdate',{'status':'OK', 'data':rows[0]});
            
        }
    });
});
//user update
router.post('/update/process',function(req,res,next){
    var sql = 'UPDATE board_db.t_user SET login_id=?, login_pwd=?, user_name=?, email=? WHERE uid =?';
    var values = [req.body.user_id, req.body.user_pwd,req.body.user_name,req.body.user_email, req.body.uid];
    connection.query(sql,values,function(err, result){
      console.log(result);
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
//user delete
router.post('/update/delete',function(req,res,next){
    var sql = 'delete from board_db.t_user WHERE uid =?';
    var values = [req.body.uid];
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
