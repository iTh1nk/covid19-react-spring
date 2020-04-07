import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AssignContext } from "./AssignContext";
import { Button } from "reactstrap";

import lan from "../data/language.json";

import toaster from "toasted-notes";

import Navi from "./Navi";
// import Intro from "./Intro";
import We0mmm from "./We0mmm";
import NoMatch from "./NoMatch";
import Covid19 from "./Covid19";

export default function MainWeb() {
  // console.log("Local Storage: ", window.localStorage.getItem('lanSwitch'))
  const [lanSwitch, SetLanSwitch] = useState(window.localStorage.getItem("lanSwitch") || "cn");

  useEffect(() => {
    // SetLanSwitch(window.localStorage.getItem('lanSwitch'));
    toaster.notify(
      <div style={{ fontWeight: "bold", color: "darkgreen" }}>
        {lan.toasterNote[lanSwitch]}
      </div>,
      {
        duration: 5000
      }
    );
    // toaster.notify(({ onClose }) => (
    //   <div>
    //     <span>My custom toaster</span>
    //     <Button
    //       color="primary"
    //       outline
    //       size="sm"
    //       onClick={onClose}
    //     >
    //       关闭
    //     </Button>
    //   </div>
    // ));
  }, []);

  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(
    ""
  );

  return (
    <>
      <AssignContext.Provider
        value={{
          toggleSearch,
          setToggleSearch,
          toggleStatus,
          setToggleStatus,
          lanSwitch,
          SetLanSwitch,
          lan
        }}
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
