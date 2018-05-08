var express = require('express');
var router = express.Router();
var passport = require('passport');
var Article = require('../models/article');

router.get('/', function(req, res, next){
  
  res.render('articles/index', {title: 'Article Management'});
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('articles/register', {
     title: 'Create an Article'
  });
});

router.get('/login',function(req, res, next){
  res.render('articles/login', {title: 'Login'});
});

router.post(
  '/login', 
  passport.authenticate('local'),
  function(req, res, next){
    res.redirect('/articles');

});

router.get('logout', function(req, res, next){
  req.logout();
  res.redirect('/articles/login');
});

module.exports = router;