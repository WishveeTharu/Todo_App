const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db.config.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error: ", err);
    process.exit(1);
  }
  console.log("MySQL connected...");
  connection.release(); 
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the to-do app." });
});

const taskRouter = require("./controllers/task.controller");
const listRouter = require("./controllers/list.controller");
const userRouter = require("./controllers/user.controller");
const noteRouter = require("./controllers/note.controller");
const attachmentsRouter = require("./controllers/attachment.controller");
const prioritiesRouter = require("./controllers/priority.controller");

app.use("/tasks", taskRouter);
app.use("/lists", listRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/attachments", attachmentsRouter);
app.use("/priorities", prioritiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});