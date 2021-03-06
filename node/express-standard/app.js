var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');
var passport = require('./routes/passport');
var entry = require('./routes/entry');
var api = require('./routes/api');
var angular = require('./routes/angular');


var User = require('./models/User');

var midAuth = require('./lib/auth');

var app = express();


//set upload photos
app.set('photos', path.join(__dirname, '.tmp/photos'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/vendor',express.static(path.join(__dirname, 'public/vendor')));
app.use('/app',express.static(path.join(__dirname, 'public/dist/app')));
app.use('/assets/img',express.static(path.join(__dirname, 'public/dist/assets/img')));
app.use('/public/dist',express.static(path.join(__dirname, 'public/dist')));



app.use('/tmp',express.static(path.join(__dirname, 'tmp')));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.use(midAuth.baseAuth());
//验证登陆中间件
app.use(midAuth.auth());
/*
app.use(function(req, res, next) {
  var uid = req.session.uid;
  if(!uid) return next();
  User.get(uid, function(err, user) {
    if(err) return next(err);
    req.user = res.locals.user = user;
    next();
  })
});*/


app.locals.messages = [{type: "hello", string:"$$$this is a app message all user will see it~~"}]

app.use('/', routes);
app.use('/', angular);

app.use('/users', users);
app.use('/passport', passport);
app.use('/entry', entry);

app.use('/api', api);


//程序级变量可以在页面中获取
// app.locals = {
//   age: 18,
//   nick: "xiaobai"
// }

app.use('/photos', photos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
