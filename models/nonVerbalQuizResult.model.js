var mongoose = require("mongoose");

var nonVerbalQuizResultSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nonVerbalQuiz', 
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: false
    },
    answers:{
        type: [String],
        required: false
    },
    dateAttempted: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('nonVerbalQuizResult', nonVerbalQuizResultSchema);
