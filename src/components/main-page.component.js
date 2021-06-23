import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
const postedTasks = [];

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
 
    };
  }

  onClickCheckbox(e) {
    if(this.state.checkedIndex !== e.target.value){
    this.setState({
      checkedIndex: e.target.value
    })}

    else{
      this.setState({
        checkedIndex:""
      })
    }
    // console.log(this.state.checkedIndex)

    // postedTasks[value] = "crossed"
    // this.setState({
    //   decoration:""
    // })
  }

  onChange(e) {
    this.setState({
      task: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    postedTasks.push(this.state.task);
    console.log(postedTasks);
    this.setState({
      task: "",
    });
  }
  // e.target.value === "2" ? this.setState({
  //   decoration:"line-through"
  // }): this.setState({decoration:""})

  taskList() {
    return postedTasks.map((currentTask, index) => {
      return (
        <p key={index}>
          <input type="checkbox" value={index} onClick={this.onClickCheckbox} />{" "}
          <span
            style={
              (this.state.checkedIndex === index.toString())
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
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
