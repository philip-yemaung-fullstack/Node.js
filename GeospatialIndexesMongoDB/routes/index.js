var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Listing locations...');
  // Ask Mongo driver to open a connection to a running server
  MongoClient.connect('mongodb://127.0.0.1:27017/homework8', function (err, db) {
    if (err) throw err;
    db.collection("locations").find({}).toArray(function(err, result) {      
      if (err) throw err;
      var locations = [];
      for(record of result) {
        locations.push({
          id: record._id,
          name: record.name,
          category: record.category,
          location: record.location
        });
      }
      res.render('index', { title: 'Express', locations: locations });
      db.close();
    });
  });
  
});

module.exports = router;
