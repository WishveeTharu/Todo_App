const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { priorityName, priorityLevel} = req.body;
    const priority = [priorityName, priorityLevel];
  
    db.query('INSERT INTO priorities (priorityName, priorityLevel) VALUES (?, ?)', priority, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Priorities." });
      }
      res.send({ id: result.insertId, ...priority });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM priorities', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving Priorities." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM priorities', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all Priorities." });
      }
      res.send({ message: `${result.affectedRows} Priorities were deleted successfully!` });
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM priorities WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving priority id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `Priorities not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE priorities SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating priority id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update priority with id=${id}. Priority not found.` });
      }
      res.send({ message: "Priority was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM priorities WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete priority with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete priority with id=${id}. Priority not found.` });
      }
      res.send({ message: "Priority was deleted successfully!" });
    });
  });

module.exports = router;