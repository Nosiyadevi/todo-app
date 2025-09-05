const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // ✅ allow frontend requests

// Add a new task
app.post("/tasks", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO tasks (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, name });
  });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Task deleted" });
  });
});

app.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});
