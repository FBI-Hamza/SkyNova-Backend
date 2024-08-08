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
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Documentary',
        required: false
    },
    famousQuote:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Quote',
        required: true
    }

    
});

module.exports = mongoose.model('warhero', warheroSchema);