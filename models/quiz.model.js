var mongoose = require("mongoose");
const Question = require('../models/question.model');

var quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: false
    }],
    attempted: {
        type: Boolean,
        default: false 
    },
    attemptedSecondTime: {
        type: Boolean,
        default: false 
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
