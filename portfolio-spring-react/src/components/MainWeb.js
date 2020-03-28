import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navi from "./Navi";
import Intro from "./Intro";
import We0mmm from "./We0mmm";
import NoMatch from "./NoMatch";

export default function MainWeb() {
  return (
    <>
      <Navi />

      <Router>
        <Switch>
          <Route exact path="/" render={props => <Intro />} />
          <Route exact path="/we0mmm" render={props => <We0mmm />} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </>
  );
}
