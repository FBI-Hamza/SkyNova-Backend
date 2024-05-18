var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const { CommandFailedEvent } = require("mongodb");
const crypto = require('crypto');
const secret = "Hamza";

var quizSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    
});




module.exports = mongoose.model('quiz', quizSchema);

// userSchema.methods.createResetPasswordToken = () =>{
//     const  resetToken = crypto.randomBytes(32, this.toString('hex'));

//     crypto.createHash()
// }