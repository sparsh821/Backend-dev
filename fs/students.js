const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  marks: { type: Number, required: true, min: 0 },
  course: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);