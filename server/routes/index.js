var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken')
/* GET home page. */
router.get('/',verifyToken, function(req, res, next) {
  return res.render('index', { title: 'HOSTEL MANAGEMENT' });
});

module.exports = router;
