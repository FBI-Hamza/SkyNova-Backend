var mongoose = require("mongoose");

var resultSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('result', resultSchema);