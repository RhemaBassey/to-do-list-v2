import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const name = window.location.pathname;
const title = name.slice(3, name.length);

export default class Subcategory extends Component {
  constructor(props) {
    super(props);
    
    this.editBtn = this.editBtn.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this)
    this.trash = this.trash.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onClickCheckbox = this.onClickCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      editPost: "",
      editIndex: "",
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

  editBtn(e){
    const index = e.target.id
    const actualID = this.state.postedTasksID[index]

    // edits the front end
    this.state.postedTasks[index] = this.state.editPost
    this.setState({
      editIndex:""
    })

    // edits the backend
      const newEdit = {
      task: this.state.editPost
    };

      axios
          .post(
            "http://localhost:5000/c/" + title + "/update/" + actualID , newEdit
          )
          .then((res) => console.log(res.data));
  }

  edit(e) {
    this.setState({
      editIndex: e.target.id,
      editPost: this.state.postedTasks[e.target.id],
    });
  }

  handleEdit(e){
    this.setState({
      editPost: e.target.value
    })
  }

  cancelEdit(){
    this.setState({
      editIndex:""
    })
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
      .delete("http://localhost:5000/c/" + title + "/" + actualID)
      .then((res) => console.log(res.data));
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

    console.log(doneStatus1.task);
    console.log(doneStatus2.task);

    doneTasks.includes(value)
      ? axios
          .post(
            "http://localhost:5000/c/" + title + "/isDoneFalse/" + value,
            doneStatus1
          )
          .then((res) => console.log(res.data))
      : axios
          .post(
            "http://localhost:5000/c/" + title + "/isDoneTrue/" + value,
            doneStatus2
          )
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
        .delete(
          "http://localhost:5000/c/" + name.slice(3, name.length) + "/" + id
        )
        .then((res) => console.log(res.data));
    });

    this.setState({
      doneTasks: [],
    });
    console.log(doneTasks);
    console.log(postedTasksID);
    console.log(postedTasks);
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
          {this.state.editIndex === String(index) ? (
            <>
            <form>
              <input
                type="text-box"
                // defaultValue={this.state.postedTasks[index]}
                onChange={this.handleEdit}
                value={this.state.editPost}
              />{" "}
              {/* <button className="btn btn-primary" onClick={this.editBtn} id={index}>Edit</button> */}
                            <input type="submit" className="btn btn-primary" onClick={this.editBtn} id={index} value="Ëdit"/>
                            <button onClick={this.cancelEdit} className="btn btn-dark">Cancel</button>
            </form>

              
            </>
          ) : (
            <span>
              {/* defaultValue={this.state.postedTasks[index]} */}
              <input
                type="checkbox"
                onClick={this.onClickCheckbox}
                value={this.state.postedTasksID[index]}
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
                <span>
                  <Link to="#" className="hide">
                    <i
                      id={index}
                      onClick={this.trash}
                      className="far fa-trash-alt"
                    ></i>
                  </Link>
                  <Link to="#" className="hide">
                    <i
                      id={index}
                      onClick={this.edit}
            
                      className="far fa-edit"
                    ></i>
                  </Link>
                </span>
              </span>
            </span>
          )}
        </p>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{ textDecoration: "underline" }}>
            {name.slice(3, name.length)}
          </h1>
          <p>
            {" "}
            Done: {this.state.doneTasks.length}/{this.state.postedTasks.length}
          </p>
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
