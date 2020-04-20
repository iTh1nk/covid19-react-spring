import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Table,
} from "reactstrap";
import Axios from "axios";

export default function Login() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/api/user/list")
      .then((resp) => {
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    Axios.post("/api/user/signup", data)
      .then((resp) => {
        console.log("Submitted! ", resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDel = (e, id) => {
    e.preventDefault();
    Axios.delete("/api/user/del/" + id)
      .then((resp) => {
        console.log("Deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container style={{ marginTop: "2em" }}>
        <h3>isLoggedIn: </h3>
        <hr />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label>User Name: </Label>
            <Input
              placeholder="Please input user name..."
              id="username"
              type="text"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password: </Label>
            <Input
              placeholder="Please input user password..."
              id="password"
              type="password"
            ></Input>
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
        <hr />
        <Table borderless style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>
                  <Button
                    size="sm"
                    outline
                    color="danger"
                    onClick={(e) => handleDel(e, item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
