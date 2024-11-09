var mongoose = require("mongoose");

var wingsOfGloryResourceSchema = mongoose.Schema({
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
        required: false
    },
    content:{
        type: String,
        required: false
    },
    file:{
        type: String,
        required: false
    },
    likeCounts:{
        type: Number,
        default: 0,
        required: false
    },
  
});

module.exports = mongoose.model('WingsOfGloryResource', wingsOfGloryResourceSchema);