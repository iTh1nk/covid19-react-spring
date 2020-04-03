import React from "react";
import { NavbarBrand, Navbar } from "reactstrap";

function Navi() {
  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          麦报
        </NavbarBrand>
      </Navbar>
    </>
  );
}

export default Navi;
