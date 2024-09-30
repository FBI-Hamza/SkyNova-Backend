var mongoose = require("mongoose");

var medicalDetailsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eyesight:{
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    heightUnit: {
        type: String,
        enum:['cm','in'],
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    weightUnit: {
        type: String,
        enum:['lbs','kg'],
        required: true
    },
    medicalReport: {
        type: String, 
        required: false
    }
});

module.exports = mongoose.model('Medical Details', medicalDetailsSchema);