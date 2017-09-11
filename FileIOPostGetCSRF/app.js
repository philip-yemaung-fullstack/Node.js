var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var csrf = require('csurf');

var index = require('./routes/index');
var newsletter = require('./routes/newsletter');
var thankyou = require('./routes/thankyou');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'some-key',
  secret: 'testing123'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(csrf());

app.use(function (request, response, next) {
  response.locals.csrftoken = request.csrfToken();
  next();
});

app.use('/', index);
app.use('/newsletter', newsletter);
app.use('/thankyou', thankyou);

app.post('/newsletter', function (req, res, next) {
  var email = req.body.email;
  fs.appendFile('emails.txt', email + '\n', (err) => {
    if (err) throw err;
    console.log(`${email} was appended to file!`);
  });
  res.redirect(`/thankyou?email=${email}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
