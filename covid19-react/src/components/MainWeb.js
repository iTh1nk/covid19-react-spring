import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AssignContext } from "./AssignContext";
// import { Button } from "reactstrap";

import lan from "../data/language.json";

import Navi from "./Navi";
// import Intro from "./Intro";
import We0mmm from "./We0mmm";
import NoMatch from "./NoMatch";
import Covid19 from "./Covid19";
import AuthModal from "./AuthModal";
import Login from "./Login";

export default function MainWeb() {
  // console.log("Local Storage: ", window.localStorage.getItem('lanSwitch'))
  const [lanSwitch, SetLanSwitch] = useState(
    window.localStorage.getItem("lanSwitch") || "cn"
  );

  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleStatus, setToggleStatus] = useState("");

  return (
    <>
      {/* <Intro /> */}
      <AssignContext.Provider
        value={{
          toggleSearch,
          setToggleSearch,
          toggleStatus,
          setToggleStatus,
          lanSwitch,
          SetLanSwitch,
          lan,
        }}
      >
        <Navi />
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Covid19 />} />
            <Route exact path="/we0mmm" render={(props) => <We0mmm />} />
            <Route exact path="/admin" render={(props) => <AuthModal />} />
            <Route exact path="/login" render={(props) => <Login />} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </AssignContext.Provider>
    </>
  );
}
