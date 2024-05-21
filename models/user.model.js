var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { CommandFailedEvent } = require("mongodb");
const crypto = require('crypto');
const secret = "Hamza";

var userSchema = mongoose.Schema({
    role:{
        type: String,
        enum:['Admin','Aviator'],
        required: true
    },
    userName:{
        type: String,
        required: true
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

module.exports = mongoose.model('user', userSchema);



