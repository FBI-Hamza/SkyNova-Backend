var mongoose = require("mongoose");

var nonVerbalQuestionSchema = mongoose.Schema({
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

module.exports = mongoose.model('NonVerbalQuestion', nonVerbalQuestionSchema);