var mongoose = require("mongoose");

const jetSchema = new mongoose.Schema({
  // image: {  
  //   data: Buffer,
  //   contentType:String,
  // },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('jet', jetSchema);