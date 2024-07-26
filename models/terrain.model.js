var mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  terrainURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('terrain', terrainSchema);