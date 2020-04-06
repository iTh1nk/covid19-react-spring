import React, { useContext } from "react";
import { NavbarBrand, Navbar, NavbarText, Button, Nav } from "reactstrap";
import { AssignContext } from "./AssignContext";
import TextLoop from "react-text-loop";

function Navi() {
  const { toggleStatus, setToggleStatus } = useContext(AssignContext);
  const { toggleSearch, setToggleSearch } = useContext(AssignContext);

  const toggle = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="text-md-center">
          <TextLoop>
            <h1 style={{ color: "darkblue" }}>麦报</h1>
            <h1 style={{ color: "darkblue" }}>麦报</h1>
          </TextLoop>
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
            麦搜索 {toggleStatus}
          </Button>
        </NavbarText>
      </Navbar>
    </>
  );
}

export default Navi;
