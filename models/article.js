var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require ('passport-local-mongoose');

//Create a schema
var Article = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        unique: [true, 'Title must be unique']
    },
    

    slug: {
        type: String,
        required: [true, 'Please enter a slug'],
        unique: [true, 'Please use a different Slug']
    },

    keywords: {
        type: String,
    },
    description: {
        type: String,
    },
    body: {
        type: String,
    },

    /*hash: {
        type: String,
        required: [
            true,
            'there was a problem creating your article name'
        ]
    },
    salt: {
        type: String,
        required: [
            true,
            'there was a problem creating your article name'  
        ]
    },*/

    created:{
        type: Date,
        default: Date.now
    },

    published:{
        type: Date,
        required: [
            true,
            'Please enter a publication date.',
        ]
    },
    modified:{
        type: Date,
        default: Date.now
    }
});

Aritcle.pre('save', function(next){
    this.modified = new Date().toISOString();
    next();
});

Aritcle.plugin(uniqueValidator);


module.exports = mongoose.model('Aritcle', Aritcle);