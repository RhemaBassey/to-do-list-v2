import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from "react-bootstrap"

export default class NavigationBar extends Component {
  render() {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
        <Navbar.Brand href="#home" className="nav-heading">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-content">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
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
