var mongoose = require("mongoose");

var nonVerbalQuestionSchema = mongoose.Schema({
    text:{
        type: String,
        required: false
    },
    image:{
        type: String,
        required: false
    },
    options:{
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('nonVerbalQuestion', nonVerbalQuestionSchema);