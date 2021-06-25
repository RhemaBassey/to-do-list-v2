const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

// express server
const app = express()
const port = process.eventNames.PORT || 5000
 
// cors middleware
app.use(cors()) 
app.use(express.json()) 

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Successfully connected to MongoDB database")
})

// test
// const router = require("express").Router();
// let Task = require("./models/task.model");

// router.route("/").post((req, res) => {
//   console.log("posted stuff")
//   const task = req.body.task;

//   const newTask = new Task({ task });

//   newTask
//     .save()
//     .then(() => res.json("Task added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// module.exports = router;

// test 2
// app.get("/", (req,res) => {
//     console.log("works")
// })


// links the 'main-page' route to the  (main page) '/' directory
app.use('/', require('./routes/main-page'))

// starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})    
 