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
    contentURL: {
        type: String,
        required: true
    },
    scenario: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('resource', resourcesSchema);