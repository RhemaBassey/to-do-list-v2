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
  const isDone = req.body.isDone

  const newTask = new Task({ _id, task, isDone });
  console.log(task);

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
   const _id = req.params.id

  Task.findByIdAndDelete(_id)
  .then(() => res.json("Tasks deleted >>" ))
  .catch((err) => res.status(400).json("Error: " + err));
})

router.route("/done/add/:id").post((req, res) => { 
  Task.findById(req.params.id)
  .then(doneStatus1 => { // you can call it update/ anything else
    doneStatus1.task = req.body.task;
    doneStatus1.isDone = req.body.isDone

    doneStatus1.save()
    .then(() => res.json('Task updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
  })
  .catch(err => res.status(400).json('Error: ' + err))
})

router.route("/done/remove/:id").post((req, res) => { 
  Task.findById(req.params.id)
  .then(doneStatus2 => { // you can call it update/ anything else
    doneStatus2.task = req.body.task;
    doneStatus2.isDone = req.body.isDone
    
    doneStatus2.save()
    .then(() => res.json('Task updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
  })
  .catch(err => res.status(400).json('Error: ' + err))

})


module.exports = router;
