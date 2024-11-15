var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { time } = require("console");

var messageSchema = mongoose.Schema({
    senderID:{
        type: String,
        required: true
    },
    receiverID:{
        type: String,
        required: false
    },
    content: {
        type: String, 
        required: true
    },
    time:{
        type: Date,
        default: Date.now
    },
    type:{
        type: String,
        required: false
    },
    status:{
        type: String,
        enum:['Sent','Read','Delivered'],
        required: false
    },
});

module.exports = mongoose.model('message', messageSchema);



