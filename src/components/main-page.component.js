import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props) {
    super(props); 

    //|| this.state.isDone === true
    this.trash = this.trash.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task: "",
      postedTasks: [], //for task you've submitted, stores values in strings
      postedTasksID: [], // stores values in integers
      doneTasks: [], //for tasks you've crossed off, stores values in strings
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
          element.isDone && this.state.doneTasks.push(String(element._id))
        );
      });
      this.setState({
        refresh: "",
      });
    });
  }

  trash(e) {
    const doneTasks = this.state.doneTasks;
    const postedTasksID = this.state.postedTasksID;
    const postedTasks = this.state.postedTasks;

    const value = e.target.id;
    const valueInt = parseInt(value);

    const actualID = postedTasksID[valueInt];

    //frontend deletion
    this.setState(postedTasks.splice(valueInt, 1));
    this.setState(postedTasksID.splice(valueInt, 1));
    doneTasks.includes(String(actualID)) &&
      this.setState(doneTasks.splice(doneTasks.indexOf(String(actualID)), 1));

    //backend deletion

      axios
        .delete("http://localhost:5000/" + actualID)
        .then((res) => console.log(res.data));


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

      const id = element;
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
    const postedTasksID = this.state.postedTasksID;
    const trueIndex = postedTasksID.indexOf(parseInt(value));

    // removes and adds element from doneTasks in DB (had to updated DB first, otherwise code won't properly work)
    const doneStatus1 = {
      task: this.state.postedTasks[trueIndex],
      isDone: false,
    };

    const doneStatus2 = {
      task: this.state.postedTasks[trueIndex],
      isDone: true,
    };

    doneTasks.includes(value)
      ? axios
          .post("http://localhost:5000/done/remove/" + value, doneStatus1)
          .then((res) => console.log(res.data))
      : axios
          .post("http://localhost:5000/done/add/" + value, doneStatus2)
          .then((res) => console.log(res.data));

    // removes and adds element from doneTasks in browser
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
      _id:
        this.state.postedTasksID.length > 0
          ? parseInt(this.state.postedTasksID.slice(-1)[0]) + 1
          : 0, // last value
      task: this.state.task,
      isDone: false,
    };
    // console.log(theTask._id)

    // 'theTask' data gets sent, and inside it, 'task' is used in the router backend.
    axios
      .post("http://localhost:5000/", theTask)
      .then((res) => console.log(res.data));
  }

  taskList() {
    return this.state.postedTasks.map((currentTask, index) => {
      // const ID = this.state.postedTasksID[index]
      return (
        // ratherm than use pure 'index', as done before, I used the postedTasksID to sync my postedTasksID to each postedTask (thus making deletion easier).
        <p key={this.state.postedTasksID[index]}>
          <input
            type="checkbox"
            value={this.state.postedTasksID[index]}
            onClick={this.onClickCheckbox}
            defaultChecked={this.state.doneTasks.includes(
              this.state.postedTasksID[index].toString()
            )}
          />{" "}
          <span
            style={
              this.state.doneTasks.includes(
                String(this.state.postedTasksID[index])
              )
                ? //|| this.state.isDone === true
                  { textDecoration: "line-through", fontStyle: "italic" }
                : { textDecoration: "" }
            }
          >
            {currentTask}
            {/* trash icon  */}
            <span >
              <Link to="#" className="hide">
                <i
                  id={index}
                  onClick={this.trash}
                  className="far fa-trash-alt"
                ></i>
              </Link>
            </span>
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

        <div className="tasks">{this.taskList()}</div>

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
            value="+"
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
