import React, { useContext } from "react";
import { NavbarBrand, Navbar, NavbarText, Button, Nav } from "reactstrap";
import { AssignContext } from "./AssignContext";
import TextLoop from "react-text-loop";

function Navi() {
  const {
    toggleStatus,
    setToggleStatus,
    toggleSearch,
    setToggleSearch,
    lanSwitch,
    SetLanSwitch,
    lan
  } = useContext(AssignContext);

  const toggle = () => {
    setToggleSearch(!toggleSearch);
  };

  const handleLanSwitch = e => {
    e.preventDefault();
    if (lanSwitch === "cn") {
      SetLanSwitch("en");
      window.localStorage.setItem("lanSwitch", "en");
    } else {
      SetLanSwitch("cn");
      window.localStorage.setItem("lanSwitch", "cn");
    }
    // window.location.reload();
  };

  const lanSwitchIconStyle = {
    width: "1.8em",
    height: "1.8em"
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <TextLoop interval="6000">
            <h1 style={{ color: "darkblue" }}>
              {lanSwitch ? "麦 报" : "麦 报"}{" "}
            </h1>
            <h1 style={{ color: "darkblue", transform: "scale(1, 1)" }}>
              {lanSwitch ? "MCast" : "MCast"}{" "}
            </h1>
          </TextLoop>
        </NavbarBrand>
        <Nav className="mr-auto" navbar>
          <Button size="sm" outline onClick={e => handleLanSwitch(e)}>
            <img
              src="/lanSwitch.png"
              alt="Language Icon"
              style={lanSwitchIconStyle}
            ></img>{" "}
            {lan.lanSwitchBtn[lanSwitch]}
          </Button>
        </Nav>
        <NavbarText>
          <Button
            color="primary"
            size="sm"
            outline
            // onClick={toggle}
            style={{ marginBottom: "1rem" }}
          >
            {lan.searchBtn[lanSwitch]} {toggleStatus}
          </Button>
        </NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
