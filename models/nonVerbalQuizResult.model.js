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
    score: {
        type: Number,
        required: true
    },
    dateAttempted: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('nonVerbalQuizResult', nonVerbalQuizResultSchema);
