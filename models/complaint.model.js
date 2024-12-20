var mongoose = require("mongoose");

var complaintSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('complaint', complaintSchema);