import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/* The following line can be included in your src/index.js or App.js file*/
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import NoMatch from "./components/no-match.jsx"
import MainPage from "./components/main-page.component"
import Subcategory from "./components/subcategory.component"

const name=["test","rest"]
function App() {
  return (
    <Router>
    {/* switch goes through all the woutes from top to bottom, 
    and executes the bottomost route if no path match is found */}
      <Switch> 
      {/* <div className="container"> */}

        <Route exact path="/"  >
            <Navbar />
            <br />
            <MainPage />
        </Route>

        <Route path={"/c/:name" }>
          <Navbar />
          <Subcategory/>
        </Route>
          
        <Route>
          <NoMatch/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
