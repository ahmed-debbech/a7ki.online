var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var redis = require('./redis/redis')
var updateCallback = require('./redis/update_msg')
var ip_checker = require("./middlewares/ip_checker");

redis.startRedisClient()
redis.listenToMessageEvents().then((subscriber) => { 

  subscriber.on('pmessage', async (pattern, channel, event) => {
    let messageDecision = await updateCallback.decideMessageStatusAfterSignal(subscriber, pattern, channel, event)
    console.log(messageDecision)

  });

})

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(ip_checker.check)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status + " : " + err.message);
});

module.exports = app;
