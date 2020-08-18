import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage';
// import ContactPage from "./components/ContactPage";

function App() {

  const signOut = () => {
    localStorage.removeItem('token');
  }

  return (
    <Router>
      <div className="App">
        <nav className="nav-links">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/protected">Bubbles</Link>
          {/* <Link className="nav-link" to="/contact">Contact</Link> */}
          <Link className="nav-link" to="/login" onClick={signOut}>Sign out</Link>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={BubblePage} />
          {/* <Route path="/contact" component={ContactPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
