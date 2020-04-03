import React from "react";
import { NavbarBrand, Navbar, NavbarText } from "reactstrap";

function Navi() {

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <h1 style={{ color: "darkblue" }}>麦报</h1>
        </NavbarBrand>
        <NavbarText>
          <span style={{fontStyle: "italic"}}></span>
        </NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
