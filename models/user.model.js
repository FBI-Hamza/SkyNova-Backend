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

});




module.exports = mongoose.model('user', userSchema);

// userSchema.methods.createResetPasswordToken = () =>{
//     const  resetToken = crypto.randomBytes(32, this.toString('hex'));

//     crypto.createHash()
// }