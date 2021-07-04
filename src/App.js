import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from "./components/main-page.component"
import Navbar from "./components/navbar.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MainPage} />
      </div>
    </Router>
  );
}

export default App;
