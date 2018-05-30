
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uniqueValidator = require('mongoose-unique-validator'),
  slug = require('slug'),
  passportLocalMongoose = require('passport-local-mongoose');

//Create a schema
var Article = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    unique: [true, 'Title is already in use']
  },
    keywords: String,
    description: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number,
  },    

  slug: {
    type: String,
    required: [true, 'Please enter a slug'],
    unique: [true, 'Slug is already in use']
  },
 
  
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Date
    //required: [true, 'Please enter a pub date'],
  },
  deleted: {
    type: Date
  }
});

//Auto set the slug prior to validation
Article.pre('validate', function(next){

  if(this.title){
  this.slug = slug(this.title).toLowerCase();
  }
  next();
});

//Auto set the modified date prior to save

Article.pre('save', function(next){
  this.modified = new Date().toISOString();
  next();
});

Article.plugin(uniqueValidator);

module.exports  = mongoose.model('Article', Article);


