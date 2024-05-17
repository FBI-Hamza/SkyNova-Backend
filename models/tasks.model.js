var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
    taskId: {
      type: Number,
      required: true,
      unique:[true,"ID is already present"],
    },
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      dueDate: {
        type: Date,
      },
});

module.exports = mongoose.model('task', taskSchema);