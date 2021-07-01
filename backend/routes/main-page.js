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

router.route("/done/add/").post((req, res) => { 
 
  // const id = req.params.value

  console.log(">> added")


//  Task.findByIdAndUpdate(id, {
//    "isDone": true
//  }, (err, result) =>{
//    if(err){
//     //  res.send(err)
//    }
//    else{
//     //  res.send(result)
//    }
//  })
})

router.route("/done/remove/").post((req, res) => { 
  // const id = req.params.value

  
//  Task.findByIdAndUpdate(id, {
//   "isDone": false
// }, (err, result) =>{
//   if(err){
//    //  res.send(err)
//   }
//   else{
//    //  res.send(result)
//   }
// })
 

  console.log( ">> removed")

})
module.exports = router;
