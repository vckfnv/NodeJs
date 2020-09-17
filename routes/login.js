var express = require('express');
var connection = require('../db/mysql');
var router = express.Router();

//check ID
router.get('/checkid', function(req, res, next) {
    var sql = 'select uid from t_user where login_id=?';
    var values = [req.query.login_id];
    connection.query(sql,values, 
            function(err, row, field) {
                if(err){
                    res.send('ERROR');
                    console.log(req.query.login_id);
                } else {
                    if(row.length > 0) {
                        res.send('DUPLICATED');
                    } else {
                        res.send('OK');
                    }
                }
    }); 
}); 
//sign in
router.post('/create', function(req, res, next) {
    var sql = 'INSERT INTO board_db.t_user ' +
        '(login_id, login_pwd, user_name, email) ' +
        'VALUES (?,?,?,?)';
    var values = [req.body.login_id, req.body.login_pwd, req.body.user_name, req.body.email]
    connection.query('select * from t_user where login_id=?', [req.body.login_id], 
            function(err, row, field){
                if(err) {
                    res.json({'status':'ERROR'});
                } else {
                    //double check
                    if(row.length > 0) {
                        res.json({'status':'ERROR'});
                    } else {
                        connection.query(sql, values, function(err, row, field) {
                            if(err) {
                                res.json({'status':'ERROR'});
                            } else {
                                res.json({'status':'OK'});
                            }
                        });
                    }
                }
            });
});

/* signup page */
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

//logout
router.get('/logout', function(req,res,next){
    req.session.destroy();
    res.redirect('/');
});
/* login ajax process */
router.post('/process', function(req, res, next) {
    console.log(req.body);
    var sql = 'SELECT * from t_user where login_id=? and login_pwd=?';
    values = [req.body.login_id, req.body.login_pwd]; 
    connection.query(sql, values , function(err, rows) {
            if (err) {
                res.json({'status':'Fail', 'err_msg':'error please retry'});
            }else{  
                if (rows.length == 1){
                    req.session.uid = rows[0].uid;
                    req.session.logined = true;
                    req.session.login_id = req.body.login_id;
                    req.session.login_pwd = req.body.login_pwd;
                    req.session.username = rows[0].user_name;
                    res.json({'status': 'OK', 'login_id' : req.body.login_id});
                }else{
                    res.json({'status':'Fail', 'err_msg':'ID, Password error'});
                }
            } 
    });
});

module.exports = router;
