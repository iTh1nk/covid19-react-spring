import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AssignContext } from "./AssignContext";

import Navi from "./Navi";
// import Intro from "./Intro";
import We0mmm from "./We0mmm";
import NoMatch from "./NoMatch";
import Covid19 from "./Covid19";

export default function MainWeb() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleStatus, setToggleStatus] = useState("展开");

  return (
    <>
      <AssignContext.Provider
        value={{ toggleSearch, setToggleSearch, toggleStatus, setToggleStatus }}
      >
        <Navi />
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Covid19 />} />
            <Route exact path="/we0mmm" render={props => <We0mmm />} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AssignContext.Provider>
    </>
  );
}
