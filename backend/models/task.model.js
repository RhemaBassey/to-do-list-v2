const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  _id: { type: String, required: true },
  task: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
