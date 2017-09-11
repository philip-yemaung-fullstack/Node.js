var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
var users = require('./routes/users');
var secret = require('./routes/secret');

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/secret', secret);

app.post('/', function (req, res, next) {
  let decryptedMessage = '';
  /* Open Mongo shell and execute the two following commands:
        use homework7
        db.homework7.insert({message:'ba12e76147f0f251b3a2975f7acaf446a86be1b4e2a67a5d51d62f7bfbed5c03'}) 
  */

  // Ask Mongo driver to open a connection to a running server
  MongoClient.connect('mongodb://127.0.0.1:27017/homework7', function (err, db) {
    if (err) throw err;
    db.collection('homework7').findOne({}, function (err, doc) {
      if (err) throw err;
      let encrypted = doc.message;
      console.log(`Encrypted Text: ${encrypted}`);
      const crypto = require('crypto');
      const decipher = crypto.createDecipher('aes256', 'asaadsaad');

      decipher.on('readable', () => {
        const data = decipher.read();
        if (data)
          decryptedMessage += data.toString('utf8');
      });
      decipher.on('end', () => {
        console.log(`Decrypted Text: ${decryptedMessage}`);
        res.redirect(`/secret?decryptedMessage=${decryptedMessage}`);
      });

      decipher.write(encrypted, 'hex');
      decipher.end();

      db.close();
    });
  });
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
