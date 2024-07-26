var mongoose = require("mongoose");
var videoSchema = mongoose.Schema({
    url: {
        type: String, 
        required: true
    },
    }
);

module.exports = mongoose.model('video', videoSchema);

