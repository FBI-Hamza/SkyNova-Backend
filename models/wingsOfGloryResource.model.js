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
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Quote',
        required: true
    },
  
});

module.exports = mongoose.model('WingsOfGloryResource', wingsOfGloryResourceSchema);