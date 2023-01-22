var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Go to localhost:5000/doc for ApiDoc testing' });
});

module.exports = router;
