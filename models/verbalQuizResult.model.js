var mongoose = require("mongoose");

var verbalQuizResultSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'verbalQuiz', 
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

module.exports = mongoose.model('VerbalQuizResult', verbalQuizResultSchema);
