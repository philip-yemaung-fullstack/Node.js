var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect('mongodb://127.0.0.1:27017/homework8',
    function (err, db) {
      if (err) throw err;
      db.collection("locations").remove({ _id: new ObjectID(id) });
      db.close();
      res.redirect(`/`);
    });    
});

module.exports = router;