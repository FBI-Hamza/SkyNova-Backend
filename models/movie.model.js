var mongoose = require("mongoose");
var movieSchema = mongoose.Schema({
    url: {
        type: String, 
        required: true
    },
    }
);

module.exports = mongoose.model('movie', movieSchema);

