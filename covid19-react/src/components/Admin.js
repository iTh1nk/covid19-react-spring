import React, { useEffect, useState, useReducer } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Spinner,
} from "reactstrap";
import Axios from "axios";
import AdminIrvine from "./AdminIrvine";

// function reducer(state, action) {
//   switch (action.type) {
//     case "get":
//       return {
//         toaster: [...state.toaster, { data: action.data }],
//       };
//     // case "delete":
//     //   return {
//     //     toaster: [...state.toaster]
//     //   };
//   }
// }

export default function Admin() {
  // const [{ toaster }, dispatch] = useReducer(reducer, { toaster: [] });

  const [toaster, setToaster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    Axios.get("/api/toaster")
      .then((resp) => {
        setToaster(resp.data);
        // dispatch({ type: "get", data: resp.data });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: document.getElementById("toasterId").value,
      content: document.getElementById("toasterContent").value,
      duration: document.getElementById("toasterDuration").value * 1000,
    };
    Axios.post("/api/toaster", data, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setToaster([
          ...toaster,
          {
            id: document.getElementById("toasterId").value,
            content: document.getElementById("toasterContent").value,
            duration: document.getElementById("toasterDuration").value * 1000,
          },
        ]);
        console.log("POSTed!");
        document.getElementById("toasterId").value = "";
        document.getElementById("toasterContent").value = "";
        document.getElementById("toasterDuration").value = "";
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDel = (e, id) => {
    e.preventDefault();
    // dispatch({ type: "delete", id: id });
    Axios.delete("/api/toaster/" + id, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setToaster(toaster.filter((item) => item.id !== id));
        console.log("DELETed!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPlaceholder("");
    document.getElementById("toasterId").value = "";
    document.getElementById("toasterContent").value = "";
    document.getElementById("toasterDuration").value = "";
  };

  const handlePlaceholder = (e) => {
    e.preventDefault();
    setPlaceholder(toaster[0].content);
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "8em",
  };

  const titleStyle = {
    fontWeight: "bolder",
  };

  const conStyle = {
    marginTop: "2em",
  };

  if (isLoading) {
    return (
      <>
        <div style={loadingStyle}>
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
          <Spinner type="grow" color="primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <Container style={conStyle}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label style={titleStyle}>Toaster ID: </Label>
            <Input
              type="text"
              name="id"
              id="toasterId"
              placeholder={"Please input toaster ID..."}
            />
          </FormGroup>
          <FormGroup>
            <Label onClick={(e) => handlePlaceholder(e)} style={titleStyle}>
              Toaster Content:{" "}
            </Label>
            <Input
              type="text"
              name="content"
              id="toasterContent"
              placeholder={
                placeholder ? placeholder : "Please input toaster content..."
              }
            />
          </FormGroup>
          <FormGroup>
            <Label style={titleStyle}>Toaster duration:</Label>
            <Input
              placeholder="Please input toaster duration IN SECONDS..."
              id="toasterDuration"
              type="text"
              name="duration"
            />
          </FormGroup>

          <FormGroup style={{ width: "100%", position: "relative" }}>
            <Button type="submit" size="sm" outline color="primary">
              Submit
            </Button>
            <Button
              onClick={(e) => handleReset(e)}
              style={{ marginLeft: "2em" }}
              size="sm"
              outline
              color="secondary"
            >
              Reset
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                window.location.reload();
              }}
              style={{ position: "absolute", right: "0em" }}
              size="sm"
              color="warning"
            >
              Logout
            </Button>
          </FormGroup>
        </Form>
        <hr />
        <Table borderless style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {toaster.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.content}</td>
                <td>{item.duration / 1000 + " Sec" || "Null"}</td>
                <td>
                  <Button
                    size="sm"
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
        <hr
          style={{
            border: ".1em solid green",
            borderRadius: "1em",
          }}
        />
        <AdminIrvine titleStyle={titleStyle} conStyle={conStyle} />
        <hr
          style={{
            border: ".1em solid green",
            borderRadius: "1em",
          }}
        />
      </Container>
    </>
  );
}
