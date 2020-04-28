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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    Axios.get("/api/user/list", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        console.log("Get: ", resp.status);
        setIsLoggedIn(true);
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 403) {
          setIsLoggedIn(false);
          setUsers([]);
        }
      });
  }, [isClicked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    Axios.post("/api/user/signup", data)
      .then((resp) => {
        setIsClicked(!isClicked);
        console.log("Submitted! ", resp);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  };

  const handleDel = (e, id) => {
    e.preventDefault();
    Axios.delete("/api/user/del/" + id, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setIsClicked(!isClicked);
        console.log("Deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    Axios.post("/login", data, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setIsClicked(!isClicked);
        window.localStorage.setItem("token", resp.headers.authorization);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <Container style={{ marginTop: "2em" }}>
        {/* <div>
          <iframe
            allow="autoplay *; encrypted-media *;"
            frameBorder="0"
            height="150"
            style={{
              width: "100%",
              // maxWidth: "660px",
              overflow: "hidden",
              background: "transparent",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src="https://embed.music.apple.com/us/album/if-i-were-a-song/1274389969?i=1274389973"
          ></iframe>
        </div> */}
        {/* <br /> */}
        <h3>{isLoggedIn ? "Logged In" : "Logged Out"}</h3>
        <hr />
        <br />
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
              Singup
            </Button>
            <Button
              color="secondary"
              outline
              size="sm"
              style={{ marginLeft: "2em", marginRight: "5em" }}
              onClick={(e) => {
                handleReset(e);
              }}
            >
              Reset
            </Button>
            <Button
              color="primary"
              outline
              size="sm"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button>{" "}
            <Button
              color="warning"
              outline
              size="sm"
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </Button>
          </FormGroup>
        </Form>
        <br />
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
            {/* {console.log("DEBUG: ", users[0])} */}
            {users[0] !== "<" ? (
              users.map((item, idx) => (
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
              ))
            ) : (
              <tr>
                <td>NA</td>
                <td>NA</td>
                <td>NA</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
