var mongoose = require("mongoose");

var documentarySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
       
});

module.exports = mongoose.model('Documentary', documentarySchema);