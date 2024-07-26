const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { listName, user_id } = req.body;
    const list = [listName, user_id];
  
    db.query('INSERT INTO lists (listName, user_id) VALUES (?, ?)', list, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Lists." });
      }
      res.send({ id: result.insertId, ...list });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM lists', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving Lists." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM lists', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all Lists." });
      }
      res.send({ message: `${result.affectedRows} Lists were deleted successfully!` });
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM lists WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving list id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `List not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE lists SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating list id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update List with id=${id}. List not found.` });
      }
      res.send({ message: "List was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM lists WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete list with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete list with id=${id}. List not found.` });
      }
      res.send({ message: "List was deleted successfully!" });
    });
  });

module.exports = router;