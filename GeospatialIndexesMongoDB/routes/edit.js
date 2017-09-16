var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
    MongoClient.connect('mongodb://127.0.0.1:27017/homework8', 
    function (err, db) {
        if (err) throw err;
        
        db.collection("locations")
        .findOne({_id: new ObjectID(req.query.id)}, function(err, result) {      
          if (err) throw err;                    
          res.render('edit', { 
          location: {
              id: result._id,
              name: result.name,
              category: result.category,
              location: result.location
            }});
          db.close();        
      });
    });  
});

module.exports = router;
