var mongoose = require("mongoose");
var nonVerbalQuizSchema = mongoose.Schema({
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
        ref: 'nonVerbalQuestion',
        required: true
    }]
    }
);

module.exports = mongoose.model('nonVerbalQuiz', nonVerbalQuizSchema);
