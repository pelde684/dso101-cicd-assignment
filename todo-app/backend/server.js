require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body.task;
  if (!task) return res.status(400).json({ message: "Task cannot be empty" });
  tasks.push(task);
  res.json({ message: "Task added", task });
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= tasks.length)
    return res.status(400).json({ message: "Invalid task ID" });
  const deleted = tasks.splice(id, 1);
  res.json({ message: "Task deleted", task: deleted[0] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));