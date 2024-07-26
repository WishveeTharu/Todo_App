const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { fileName, filePath, task_id, user_id } = req.body;
    const attachment = [fileName, filePath, task_id, user_id];
  
    db.query('INSERT INTO attachments (fileName, filePath, task_id, user_id) VALUES (?, ?, ?, ?)', attachment, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Attachments." });
      }
      res.send({ id: result.insertId, ...attachment });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM attachments', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving Attachments." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM attachments', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all Attachments." });
      }
      res.send({ message: `${result.affectedRows} Attachments were deleted successfully!` });
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM attachments WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving attachment id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `Attachments not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE attachments SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating attachment id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update attachment with id=${id}. Attachment not found.` });
      }
      res.send({ message: "Attachment was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM attachments WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete attachment with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete attachment with id=${id}. Attachment not found.` });
      }
      res.send({ message: "Attachment was deleted successfully!" });
    });
  });

module.exports = router;