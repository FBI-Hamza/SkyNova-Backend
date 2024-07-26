var mongoose = require("mongoose");

var suggestionSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('suggestion', suggestionSchema);