var mongoose = require("mongoose");

var communityAnswerSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

