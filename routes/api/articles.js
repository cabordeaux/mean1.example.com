var express = require('express');
var router = express.Router();

var Article = require('../../models/article');
//var bodyParser = require('body-parser');

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended:false}));

/* GET articles listing. */
router.get('/', function(req, res, next) {
  
  
  Article.find({},function(err, articles){
    if(err){
      return res.json({'success':false,'error':err});
    }

    return res.json({'success':true, 'articles':articles});
  });
});

/* GET a single article */
router.get('/:articleId', function(req, res, next){
  var articleId=req.params.articleId;
  
  Article.findOne({'_id':articleId}, function(err, article){
    if(err){
      return res.json({'success':false,'error': err});
    }

    return res.json({'success':true, 'article':article});

});

});
/* Create/POST a article. */
router.post('/', function(req, res, next) {
  
    Article.create(new Article({
    articlename: req.body.articlename,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, article){

    if(err){
      return res.json({
        'success':false, 
        'article': req.body,
        'error':err
      });
    }

    return res.json({'success':true, 'article':article});
  });
});

//Update an article
router.put('/', function(req,res,next){

  //find the record of the article to be updated
  Article.findOne(
    {'_id': req.body._id}, 
    function(err, article){

    //return false if the article is not found
    if(err){
      return res.json({'success':true, error:err});
    }

    //If the article is found, update the record
    if(article){
      //Only update values that were passed to the enpoint
        let data = req.body;
      
        if(data.articlename){
          article.articlename = data.articlename;
        }
        if(data.email){
          article.email = data.email;
        }
        if(data.last_name){
          article.last_name = data.last_name;
        }
        if(data.first_name){
          article.first_name = data.first_name;
        }

        article.save(function(err){
          if(err){
            return res.json({success:false, error: err}); 
          }

          return res.json({success:true, article:article});

        });
      }
    });  
});

//Delete a article
router.delete('/:articleId', function(req,res,next){
  var articleId = req.params.articleId;

  Article.remove({'_id':articleId}, function(err,removed){//Register a new article
    
    if(err){
      return res.json({success:false, error:err});
    }
    return res.json({success:true, status: removed});

  });
});
//Register a new article
router.post('/register',function(req, res, next){
  var data = req.body;

  Article.register(new article({
    articlename: data.articlename,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name
  }), 
  data.password, 
  function(err, article){
    if(err){
      return res.json({
        success: false,
        article: req.body,
        errors: err
      });  
    }
    return res.json({
        success: true,
        article: article
    });

  });

});
module.exports = router;