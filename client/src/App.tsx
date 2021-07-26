import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Announcement from "./components/Announcement";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route path="/" exact component={Announcement} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/userpage" component={UserPage} />
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
