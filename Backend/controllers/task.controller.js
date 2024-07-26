const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { title, description, status, due_date, user_id, priority_id } = req.body;
    const task = [title, description, status, due_date, user_id, priority_id];
  
    db.query('INSERT INTO tasks (title, description, status, due_date, user_id, priority_id) VALUES (?, ?, ?, ?, ?, ?)', task, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Task." });
      }
      res.send({ id: result.insertId, ...task });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving tasks." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM tasks', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all tasks." });
      }
      res.send({ message: `${result.affectedRows} Tasks were deleted successfully!` });
    });
  });

router.get("/completed", (req, res) => {
  db.query('SELECT * FROM tasks WHERE status = ?', ['completed'], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Error occurred while retrieving tasks." });
    }
    res.send(results);
  });
});

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving Task id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `Task not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE tasks SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating Task id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update Task with id=${id}. Task not found.` });
      }
      res.send({ message: "Task was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete Task with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete Task with id=${id}. Task not found.` });
      }
      res.send({ message: "Task was deleted successfully!" });
    });
  });

module.exports = router;