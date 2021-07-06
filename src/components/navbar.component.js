import axios from "axios";
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from "react-bootstrap"

export default class NavigationBar extends Component {
  constructor(props){
    super(props)

    //function
    this.createCategory = this.createCategory.bind(this)

  }

  createCategory(){
    var categoryName = prompt("New Category Name:","")
    if (categoryName !== "" && categoryName !==null){
        axios.post("http://localhost:5000/c/"+categoryName).then((res) => console.log(res.data));
        console.log("hit")
    }
  }


  render() {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
        <Navbar.Brand href="#home" className="nav-heading">To-do app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-content">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" onClick={this.createCategory}>Create New Catergory</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="container-fluid">
          <form className="d-flex nav-form">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
          
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
