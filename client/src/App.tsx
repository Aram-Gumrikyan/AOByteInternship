import React, {FC} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Announcement from "./components/Announcement";
import SignUp from "./components/SignUp";
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route path="/" exact  component={Announcement}/>
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
