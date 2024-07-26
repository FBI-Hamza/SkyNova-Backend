var mongoose = require("mongoose");

var reportSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('report', reportSchema);