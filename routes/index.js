var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    'index/index', { 
      title: 'Express', 
      name:'Clovis Bordeaux'
    }
  );
});

module.exports = router;
