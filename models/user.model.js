var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

var userSchema = mongoose.Schema({
    role:{
        type: String,
        enum:['Admin','Aviator'],
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String, 
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    resetCode:{
        type: String,
        required: false
    },
    resetTokenExpiration:{
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('User', userSchema);



