import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task: "",
      postedTasks: [], //for task you've submitted
      postedTasksID: [],
      doneTasks: [], //for tasks you've crossed off
      _id: "blah",

      refresh: "",
    };
  }

  // getting data from the DB, and inserting it in postedTask
  componentDidMount() {
    axios.get("http://localhost:5000/").then((response) => {
      response.data.map((element) => {

        return (
          this.state.postedTasks.push(element.task),
          this.state.postedTasksID.push(element._id),
          console.log(element._id)   
        );
           
      });
      this.setState({
        refresh: "",
      });
    });

  }

  deleteTask() {
    const doneTasks = this.state.doneTasks;
    const postedTasksID = this.state.postedTasksID;
    const postedTasks = this.state.postedTasks;

    doneTasks.forEach((element) => {
      // trueIndex is the _id of the postedTask, a better form of ID as it's value does not vary with array length changes after deletion, opposed to using plain index of doneTask
      const trueIndex = postedTasksID.indexOf(parseInt(element));

      //frontend deletion
      this.setState(postedTasks.splice(trueIndex, 1));
      this.setState(postedTasksID.splice(trueIndex, 1));

      //backend deletion
      // const id =  postedTasksID[trueIndex]
      // console.log(id)

      const id = element
      axios
      .delete("http://localhost:5000/" + id)
      .then((res) => console.log(res.data));

    });


    this.setState({
      doneTasks: [],
    });
  }

  onClickCheckbox(e) {
    const value = e.target.value;
    const doneTasks = this.state.doneTasks;

    // removes and adds element from doneTasks
    doneTasks.includes(value)
      ? this.setState(doneTasks.splice(doneTasks.indexOf(value), 1))
      : this.setState({
          doneTasks: [...doneTasks, value],
        });
  }

  onChange(e) {
    this.setState({
      task: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    //post task to your browser
    this.setState({
      postedTasks: [...this.state.postedTasks, this.state.task],

      postedTasksID: [
        ...this.state.postedTasksID,
        this.state.postedTasksID.length > 0
          ? this.state.postedTasksID.slice(-1)[0] + 1
          : 0,
      ], //slice here is used to get the last element of the postedTasksID array
      task: "",
    });

    //post task to the DB
    const theTask = {
      _id: this.state.postedTasksID.length > 0
      ? parseInt(this.state.postedTasksID.slice(-1)[0]) + 1
      : 0, // last value
      task: this.state.task,
    };
    // console.log(theTask._id)

    // 'theTask' data gets sent, and inside it, 'task' is used in the router backend.
    axios
      .post("http://localhost:5000/", theTask)
      .then((res) => console.log(res.data));
  }

  taskList() {
    return this.state.postedTasks.map((currentTask, index) => {
      return (
        // ratherm than use pure 'index', as done before, I used the postedTasksID to sync my postedTasksID to each postedTask (thus making deletion easier).
        <p key={this.state.postedTasksID[index]}>
          <input
            type="checkbox"
            value={this.state.postedTasksID[index]}
            onClick={this.onClickCheckbox}
          />{" "}
          <span
            style={
              this.state.doneTasks.includes(
                String(this.state.postedTasksID[index])
              )
                ? { textDecoration: "line-through" }
                : { textDecoration: "" }
            }
          >
            {currentTask}
          </span>
        </p>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> To Do List </h1>
        </header>

        {this.taskList()}

        <form onSubmit={this.onSubmit}>
          <input
            type="text-box"
            placeholder="task..."
            onChange={this.onChange}
            value={this.state.task}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value= "+"
            disabled={this.state.task.length < 1}
          />
        </form>
        {this.state.doneTasks.length > 0 && (
          <button
            className="btn btn-primary btn-dark"
            onClick={this.deleteTask}
          >
            {" "}
            Delete{" "}
          </button>
        )}
      </div>
    );
  }
}
