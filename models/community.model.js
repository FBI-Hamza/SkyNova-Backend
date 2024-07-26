var mongoose = require("mongoose");

var communitySchema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer: {
        type: [String],
        required: false
    },
});

module.exports = mongoose.model('certificate', cSchema);