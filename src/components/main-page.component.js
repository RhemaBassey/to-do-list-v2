import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [] };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> To Do List </h1>
        </header>
        <p>
          <input type="checkbox" /> Read{" "}
        </p>
        <p>
          <input type="checkbox" /> Code{" "}
        </p>
        <p>
          <input type="checkbox" /> Sleep{" "}
        </p>

        <form>
          <input type="text-box" />
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
