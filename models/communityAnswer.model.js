var mongoose = require("mongoose");

var communityAnswerSchema = mongoose.Schema({
    author:{
        type: String,
        required: false
    },
    content:{
        type: String,
        required: true
    },
    date:{
      type: Date,
      default: Date.now
  },
  }
);

module.exports = mongoose.model('Community Answer', communityAnswerSchema);

