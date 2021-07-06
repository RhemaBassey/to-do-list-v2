import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"

import MainPage from "./components/main-page.component"
import Subcategory from "./components/main-page.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MainPage} />
        <Route path="/category/:name" component={Subcategory}/>
      </div>
    </Router>
  );
}

export default App;
