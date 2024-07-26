var mongoose = require("mongoose");

var certificateSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('certificate', certificateSchema);