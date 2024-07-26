const express = require("express");
const router = express.Router();
const db = require("../config/db.config.js");

router
  .route("/")
  .post((req, res) => {
    const { userName, email, Upassword } = req.body;
    const user = [userName, email, Upassword];
  
    db.query('INSERT INTO users (userName, email, Upassword) VALUES (?, ?, ?)', user, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while creating the Users." });
      }
      res.send({ id: result.insertId, ...user });
    });
  })
  .get((req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while retrieving Users." });
      }
      res.send(results);
    });
  })
  .delete((req, res) => {
    db.query('DELETE FROM users', (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error occurred while removing all Users." });
      }
      res.send({ message: `${result.affectedRows} Users were deleted successfully!` });
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).send({ message: `Error retrieving user id=${id}` });
      }
      if (results.length === 0) {
        return res.status(404).send({ message: `Users not found with id=${id}` });
      }
      res.send(results[0]);
    });
  })
  .put((req, res) => {
    const id = req.params.id;
    db.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Error updating user id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot update user with id=${id}. User not found.` });
      }
      res.send({ message: "User was updated successfully." });
    });
  })
  .delete((req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: `Could not delete user with id=${id}` });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: `Cannot delete user with id=${id}. User not found.` });
      }
      res.send({ message: "User was deleted successfully!" });
    });
  });

module.exports = router;