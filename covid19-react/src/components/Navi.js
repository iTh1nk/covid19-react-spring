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
    //   window.localStorage.setItem('lanSwitch', !window.localStorage.getItem('lanSwitch'));
    //   window.location.reload();
    if (lanSwitch === "cn") {
      SetLanSwitch("en");
    } else {
      SetLanSwitch("cn");
    }
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <TextLoop interval="6000">
            <h1 style={{ color: "darkblue" }}>{lanSwitch ? "麦 报" : "麦 报"}</h1>
            <h1 style={{ color: "darkblue", transform: "scale(1, 1)" }}>
              {lanSwitch ? "MCast" : "MCast"}
            </h1>
          </TextLoop>
        </NavbarBrand>
        <Button size="sm" onClick={e => handleLanSwitch(e)}>
          {lan.lanSwitchBtn[lanSwitch]}
        </Button>
        <Nav className="mr-auto" navbar></Nav>
        <NavbarText>
          {/* <span style={{ fontStyle: "italic" }}></span> */}
          <Button
            color="primary"
            size="sm"
            outline
            onClick={toggle}
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
