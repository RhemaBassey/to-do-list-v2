const router = require("express").Router();
let Task = require("../models/task.model");

router.route("/").get((req, res) => {
  Task.find()
    .then((x) => res.json(x))
    .catch((err) => res.status(400).json("Error: " + err));
});

//  router interacts with the data passed using axios
router.route("/").post((req, res) => {
  const _id = req.body._id;
  const task = req.body.task; // NOTE: here we use task instead of theTask

  const newTask = new Task({ _id, task });
  console.log(task);

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  //  const _id = req.body._id;

  Task.findByIdAndDelete(req.params.id)
  .then(() => res.json("Tasks deleted >>" + req.params.id))
  .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;
