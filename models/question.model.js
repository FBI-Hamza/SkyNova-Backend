var mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options:{
        type: [String],
        required: false
    },
    answer: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('Question', questionSchema);