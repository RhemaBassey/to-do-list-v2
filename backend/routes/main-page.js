const router = require("express").Router();
let Task = require("../models/task.model");

router.route("/").get((req, res) => {
  Task.find()
    .then((x) => res.json(x))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const task = req.body.task; // NOTE: here we use task instead of theTask

  const newTask = new Task({ task });
  console.log(task);

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
