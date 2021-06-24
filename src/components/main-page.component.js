import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
const postedTasks = ["eat", "sleep", "play", "read"];
const doneTasks = []; //for tasks you've crossed off

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      task: "",
      decoration: "",
      checkedIndex: "",
      buttonStatus: "disabled",

      refresh:"",
      
    };
  }

  onClickCheckbox(e) {
    const value = e.target.value;

    // adds element if doneTasks is empty
    if (doneTasks.length === 0) {
      doneTasks.push(value);
    }

    // removes and adds element from doneTasks
    else{
      for (var i = 0; i < doneTasks.length; i++) {
        if (value === doneTasks[i]) {
           doneTasks.splice(i, 1);
           break
        }
        else if (i === doneTasks.length - 1) {
          doneTasks.push(value);
          break
        }
      }
    }
    this.setState({
      refresh:""
    })
  }


  onChange(e) {
    this.setState({
      task: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    postedTasks.push(this.state.task);
    this.setState({
      task: "",
    });
  }

  taskList() {
    return postedTasks.map((currentTask, index) => {
      return (
        <p key={index}>
          <input type="checkbox" value={index} onClick={this.onClickCheckbox} />{" "}
          <span

            style={  
                doneTasks.includes(index.toString())
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
          <input type="submit" className="btn btn-primary" disabled={this.state.task.length < 1}/>
        </form>
      </div>
    );
  }
}
