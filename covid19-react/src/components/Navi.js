import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

function Navi() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Chao</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Profile</Nav.Link>
          <Nav.Link href="#features">About</Nav.Link>
          <Nav.Link href="#pricing">Admin</Nav.Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form> */}
      </Navbar>
    </>
  );
}

export default Navi;
