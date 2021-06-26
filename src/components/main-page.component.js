import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task: "",
      postedTasks: [], //for task you've submitted
      doneTasks: [], //for tasks you've crossed off

      refresh: "",
    };
  }

  // getting data from the DB, and inserting it in postedTask
  componentDidMount() {
    axios.get("http://localhost:5000/").then((response) => {
      response.data.map((element) => this.state.postedTasks.push(element.task));
      this.setState({
        refresh: "",
      });
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
      task: "",
    });

    //post task to the DB
    const theTask = {
      task: this.state.task,
    };

    // 'theTask' data gets sent, and inside it, 'task' is used in the router backend.
    axios
      .post("http://localhost:5000/", theTask)
      .then((res) => console.log(res.data));
  }

  taskList() {
    return this.state.postedTasks.map((currentTask, index) => {
      return (
        <p key={index}>
          <input type="checkbox" value={index} onClick={this.onClickCheckbox} />{" "}
          <span
            style={
              this.state.doneTasks.includes(index.toString())
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
            disabled={this.state.task.length < 1}
          />
        </form>
                  {this.state.doneTasks.length > 0 && (
              <button className="btn btn-primary btn-dark"> Delete </button>
          )}
      </div>
    );
  }
}
