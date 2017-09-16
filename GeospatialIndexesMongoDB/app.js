var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var index = require('./routes/index');
var users = require('./routes/users');
var edit = require('./routes/edit');
var remove = require('./routes/remove');
var addnewrow = require('./routes/addnewrow');
var search = require('./routes/search');

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
app.use('/edit', edit);
app.use('/remove', remove);
app.use('/addnewrow', addnewrow);
app.use('/search', search);

app.post('/edit', function (req, res, next) {
  var { id, name, category, latitude, longitude } = req.body;
  MongoClient.connect('mongodb://127.0.0.1:27017/homework8',
    function (err, db) {
      if (err) throw err;
      var objectId = new ObjectID();
      db.collection("locations").update({ _id: new ObjectID(id) },
        {
          name: name,
          category: category,
          location: [parseFloat(longitude), parseFloat(latitude)]
        });
      db.close();
    });
  res.redirect(`/`);
});

app.post('/addnewrow', function (req, res, next) {
  var { name, category, latitude, longitude } = req.body;
  MongoClient.connect('mongodb://127.0.0.1:27017/homework8',
    function (err, db) {
      if (err) throw err;
      db.collection("locations").insert(
        {
          name: name,
          category: category,
          location: [parseFloat(longitude), parseFloat(latitude)]
        });
      db.close();
    });
  res.redirect(`/`);
});

app.post('/search', function (req, res, next) {
  var { name, category, latitude, longitude } = req.body;
  MongoClient.connect('mongodb://127.0.0.1:27017/homework8',
    function (err, db) {
      if (err) throw err;
      var records = db.collection("locations").find(
        {
          category: category,
          name: {$regex : ".*"+ name +".*"},
          location: { $near: [parseFloat(longitude), parseFloat(latitude)] }
        })
        .limit(3).toArray(function (err, result) {
          db.close();
          res.render('search', { 
            locations: result, 
            name: name, 
            category: category });
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

app.listen(3000);

module.exports = app;

/**
 * 

db.locations.createIndex({location: '2d'})
db.locations.find({location: {$near: [-91.96725737988288, 41.01803626720337]}}, 
  {name:1, _id:0}).limit(2)

 */