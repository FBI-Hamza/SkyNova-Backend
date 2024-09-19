var mongoose = require("mongoose");
const verbalQuestionModel = require("./verbalQuestion.model");
var verbalQuizSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'verbalQuestion',
        required: true
    }],
    attempted: {
        type: Boolean,
        default: false 
    }
    }
);

module.exports = mongoose.model('verbalQuiz', verbalQuizSchema);

