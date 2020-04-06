import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AssignContext } from "./AssignContext";
import { Button } from "reactstrap";

import toaster from "toasted-notes";

import Navi from "./Navi";
// import Intro from "./Intro";
import We0mmm from "./We0mmm";
import NoMatch from "./NoMatch";
import Covid19 from "./Covid19";

export default function MainWeb() {
  const testFunc = e => {
    e.preventDefault();
    alert("Hello");
  };
  useEffect(() => {
    // toaster.notify(
    //   <div style={{ fontWeight: "bold", color: "darkgreen" }}>
    //     麦搜索已全面开放
    //   </div>,
    //   {
    //     duration: 5000
    //   }
    // );
    toaster.notify(({ onClose }) => (
      <div>
        <span>My custom toaster</span>
        <button
          onClick={(e, onClose) => {
            testFunc(e, onClose);
          }}
        >
          Close me please
        </button>
      </div>
    ));
  }, []);

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
