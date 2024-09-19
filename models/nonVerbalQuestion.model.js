// var mongoose = require("mongoose");

// var nonVerbalQuestionSchema = mongoose.Schema({
//     text:{
//         type: String,
//         required: false
//     },
//     image:{
//         type: String,
//         required: false
//     },
//     options:{
//         type: [String],
//         required: true
//     },
//     answer: {
//         type: String,
//         required: true
//     },
    
// });

// module.exports = mongoose.model('nonVerbalQuestion', nonVerbalQuestionSchema);

var mongoose = require("mongoose");

var optionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
});

var nonVerbalQuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    options: {
        type: [optionSchema], 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NonVerbalQuiz', 
        required: false
    }
});

module.exports = mongoose.model('nonVerbalQuestion', nonVerbalQuestionSchema);
