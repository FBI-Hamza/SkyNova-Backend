var mongoose = require("mongoose");
var documentSchema = mongoose.Schema({
    url: {
        type: String, 
        required: true
    },
    }
);

module.exports = mongoose.model('document', documentSchema);

