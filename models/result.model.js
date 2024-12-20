var mongoose = require("mongoose");

var resultSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: false
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', 
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    answers: {
        type: [String],
        required: false
    },
    dateAttempted: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Result', resultSchema);
