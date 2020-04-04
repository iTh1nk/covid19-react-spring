import React, { useContext } from "react";
import { NavbarBrand, Navbar, NavbarText, Button, Nav } from "reactstrap";
import { AssignContext } from "./AssignContext";

function Navi() {
  const { toggleSearch, setToggleSearch } = useContext(AssignContext);
  const toggle = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <h1 style={{ color: "darkblue" }}>麦报</h1>
        </NavbarBrand>
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
            点击进入麦搜索(该功能麦速更新中...)
          </Button>
        </NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
