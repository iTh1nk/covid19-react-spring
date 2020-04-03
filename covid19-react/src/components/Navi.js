import React from "react";
import { NavbarBrand, Navbar, NavbarText } from "reactstrap";
import Moment from "react-moment";
import "moment-timezone";

function Navi() {
  const date = new Date();

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <h1 style={{color: "darkblue"}}>麦报</h1>
        </NavbarBrand>
        <NavbarText>
          (更新于当地时间04-02, 17:30)
          (<Moment format="MM-DD, HH:mm">{date}</Moment>)
        </NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
