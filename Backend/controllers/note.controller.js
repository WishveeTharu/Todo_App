const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { content, task_id, user_id } = req.body;
    const note = [content, task_id, user_id];
  
    db.query('INSERT INTO notes (content, task_id, user_id) VALUES (?, ?, ?)', note, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Notes." });
      }
      res.send({ id: result.insertId, ...note });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving Notes." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM notes', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all Notes." });
      }
      res.send({ message: `${result.affectedRows} Notes were deleted successfully!` });
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving note id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `Notes not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE notes SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating note id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update note with id=${id}. Note not found.` });
      }
      res.send({ message: "Note was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete note with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete note with id=${id}. Note not found.` });
      }
      res.send({ message: "Note was deleted successfully!" });
    });
  });

module.exports = router;