var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('thankyou', { email: req.query.email });
});

module.exports = router;
