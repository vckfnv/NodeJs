var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'my secret code'
}), function(req,res,next){//그 다음으로 넘어간다
  if (req.session.logined){
    //모든 페이지에 다 저장하는 것.
    res.locals.username = req.session.username;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', function(req,res,next){
  if(req.session.uid==2){
    next();
  }else{
    res.redirect('/');
  }
}, usersRouter);
app.use('/login', loginRouter);
app.use('/board', function(req,res,next){
  if(req.session.logined){
    next();
  }else{
    res.redirect('/');
  }
}, boardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message);
});

module.exports = app;
