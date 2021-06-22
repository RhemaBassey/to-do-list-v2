import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./components/main-page.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={MainPage} />
      </div>
    </Router>
  );
}

export default App;
