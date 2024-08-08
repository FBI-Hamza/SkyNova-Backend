var mongoose = require("mongoose");

var resourcesSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    contentURL: {
        type: String,
        required: false
    },
    scenario: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('resource', resourcesSchema);