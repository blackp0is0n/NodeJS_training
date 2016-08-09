var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var HttpError = require('./error').HttpError;
var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var session = require('express-session');

var app = express();
var mongoose = require('./libs/mongoose')
var MongoStore = require('connect-mongo')(session);

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  req.session.visits_number = req.session.visits_number + 1 || 1;
  res.send("Visits:" + req.session.visits_number);
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace



app.use(require('./middleware/sendHttpError'));
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if(typeof err == 'number'){
    err = new HttpError(err);
  }
  if(err instanceof HttpError){
    res.sendHttpError(err);
  } else {
    if (app.get('env') === 'development') {
      express.errorHandler()(err, req, res, next);
    } else {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    }
  }


});



module.exports = app;
