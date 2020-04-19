import React from "react";
import { Container, Form, FormGroup, Input, Button, Label } from "reactstrap";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!");
  };

  return (
    <>
      <Container style={{ marginTop: "2em" }}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label>User Name: </Label>
            <Input placeholder="Please input user name..."></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password: </Label>
            <Input placeholder="Please input user password..."></Input>
          </FormGroup>
          <FormGroup>
            <Button color="primary" outline size="sm" type="submit">
              Submit
            </Button>
            <Button
              color="secondary"
              outline
              size="sm"
              style={{ marginLeft: "2em" }}
            >
              Reset
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}
