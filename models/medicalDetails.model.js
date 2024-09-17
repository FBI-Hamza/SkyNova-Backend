var mongoose = require("mongoose");

var medicalDetailsSchema = mongoose.Schema({
    eyesight:{
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    medicalFile: {
        type: String, 
        required: false
    }
});

module.exports = mongoose.model('Medical Details', medicalDetailsSchema);