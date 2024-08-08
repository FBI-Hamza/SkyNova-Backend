var mongoose = require("mongoose");

var communityQuestionSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community Answer',
        required: false
    }]
    }
);

module.exports = mongoose.model('Community Question', communityQuestionSchema);

