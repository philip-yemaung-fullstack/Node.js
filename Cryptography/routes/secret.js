var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('secret', { decryptedMessage: req.query.decryptedMessage });
});

module.exports = router;
