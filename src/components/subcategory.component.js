import React, { Component } from "react";
// import {Link, useParams} from "react-router-dom"
import axios from "axios";

const name = window.location.pathname;

export default class Subcategory extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task: "",
      postedTasks: [],
      refresh: "",
      doneTasks: [],
      postedTasksID: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000" + name).then((response) => {
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
    console.log(this.state.postedTasks);
    console.log(this.state.postedTasksID);
    console.log(this.state.isDone);
  }

  onClickCheckbox(e) {
    const value = e.target.value;
    const doneTasks = this.state.doneTasks;
    // const postedTasksID = this.state.postedTasksID;
    // const trueIndex = postedTasksID.indexOf(parseInt(value));

    // // removes and adds element from doneTasks in DB (had to updated DB first, otherwise code won't properly work)
    // const doneStatus1 = {
    //   task: this.state.postedTasks[trueIndex],
    //   isDone: false,
    // };

    // const doneStatus2 = {
    //   task: this.state.postedTasks[trueIndex],
    //   isDone: true,
    // };

    // doneTasks.includes(value)
    //   ? axios
    //       .post("http://localhost:5000/c/" + name + "/done/remove/" + value, doneStatus1)
    //       .then((res) => console.log(res.data))
    //   : axios
    //       .post("http://localhost:5000/c/" + name + "/done/add/" + value, doneStatus2)
    //       .then((res) => console.log(res.data));

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

  deleteTask(){
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
        .delete("http://localhost:5000/c/" + name.slice(3, name.length)+"/" + id)
        .then((res) => console.log(res.data));
    });

    this.setState({
      doneTasks: [],
    });
    console.log(doneTasks)
    console.log(postedTasksID)
    console.log(postedTasks)
  }
  
  onSubmit(e) {
    const postedTasksID = this.state.postedTasksID;

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
      .post("http://localhost:5000/c/" + name.slice(3, name.length), theTask)
      .then((res) => console.log(res.data));
    console.log(postedTasksID);
  }

  taskList() {
    return this.state.postedTasks.map((currentTask, index) => {
      return (
        <p key={this.state.postedTasksID[index]}>
          <input
            type="checkbox"
            onClick={this.onClickCheckbox}
            value={this.state.postedTasksID[index]}
          />
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
          </span>
        </p>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> {name.slice(3, name.length)}</h1>
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
