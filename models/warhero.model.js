var mongoose = require("mongoose");

var warheroSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    documentary:{
        type: String,
        required: false
    },
    famousQuote:{
        type: String,
        required: true
    }

    
});

module.exports = mongoose.model('warhero', warheroSchema);