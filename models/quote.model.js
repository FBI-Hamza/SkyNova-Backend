const { text } = require("express");
var mongoose = require("mongoose");
var quoteSchema = mongoose.Schema({
    text: {
        type: String, 
        required: true
    },
    }
);

module.exports = mongoose.model('Quote', quoteSchema);

