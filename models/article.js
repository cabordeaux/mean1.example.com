var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require ('passport-local-mongoose');

//Create a schema
var Aritcle = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email must be unique']
    },
    aritclename: {
        type: String,
        required: [true, 'Please enter an aritclename'],
        unique: [true, 'Aritclename must be unique']
    },
    first_name: String,
    last_name: String,
    admin: {
        type: Boolean,
        default: false
    },

    hash: {
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
    },

    created:{
        type: Date,
        default: Date.now
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
Aritcle.plugin(passportLocalMongoose);

module.exports = mongoose.model('Aritcle', Aritcle);