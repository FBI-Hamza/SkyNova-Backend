var mongoose = require("mongoose");

const jetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jetImage: {
    type: String,
    required: false,
  },
  jetLink: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('jet', jetSchema);