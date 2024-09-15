var mongoose = require("mongoose");
var verbalQuizResultSchema = mongoose.Schema({
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
    }]
    }
);

module.exports = mongoose.model('verbalQuiz', verbalQuizSchema);

