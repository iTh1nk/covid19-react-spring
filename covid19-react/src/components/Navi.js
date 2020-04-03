import React from "react";
import { NavbarBrand, Navbar, NavbarText } from "reactstrap";

function Navi() {
  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          麦报
        </NavbarBrand>
        <NavbarText>(更新于当地时间17:30 - 04.02)</NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
