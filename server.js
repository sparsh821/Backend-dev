// Student CRUD APIs using Express & MongoDB

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./Student");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// CREATE
app.post("/students", async (req, res) => {
  try {
    const { name, marks, course } = req.body;

    if (!name || marks === undefined || !course) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await Student.create({ name, marks, course });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// GET BY ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Error" });
  }
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

// TOPPER
app.get("/students/topper", async (req, res) => {
  const topper = await Student.findOne().sort({ marks: -1 });
  if (!topper) return res.status(404).json({ message: "No students" });
  res.json(topper);
});

app.listen(3000);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});