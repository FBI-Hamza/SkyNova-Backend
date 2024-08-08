var mongoose = require("mongoose");

var nonVerbalQuestionSchema = mongoose.Schema({
    questionText:{
        type: String,
        required: true
    },
    questionImg:{
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