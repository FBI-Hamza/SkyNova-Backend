const mongoose = require("mongoose");

const finalReportSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nonVerbalQuizResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nonVerbalQuizResult",
    required: true,
  },
  verbalQuizResult: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VerbalQuizResult",
    required: true,
  },
  medicalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medical Details",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Final Report", finalReportSchema);
