import React, { useEffect, useState, useReducer } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import Axios from "axios";

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
        // console.log("Get Toaster: ", resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id: 1,
      content: document.getElementById("toasterContent").value,
    };
    Axios.post("/api/toaster", data)
      .then((resp) => {
        console.log("POSTed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDel = (e, id) => {
    e.preventDefault();
    // dispatch({ type: "delete", id: id });
    Axios.delete("/api/toaster/" + id)
      .then((resp) => {
        setToaster(toaster.filter((item) => item.id !== id));
        console.log("DELETed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPlaceholder("");
    document.getElementById("toasterContent").value = "";
  };

  const handlePlaceholder = (e) => {
    e.preventDefault();
    setPlaceholder(toaster[0].content);
  };

  if (isLoading) {
    // console.log("Loading: ", toaster[0]);
    return "Loading...";
  }

  return (
    <>
      <Container style={{ marginTop: "5em" }}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label
              onClick={(e) => handlePlaceholder(e)}
              style={{ fontWeight: "bolder" }}
            >
              Toaster Content:{" "}
            </Label>
            <Input
              type="text"
              name="content"
              id="toasterContent"
              placeholder={
                placeholder ? placeholder : "Please input your toaster..."
              }
            />
          </FormGroup>
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
              localStorage.removeItem("auth");
              window.location.reload();
            }}
            style={{ marginLeft: "2em" }}
            size="sm"
            color="warning"
          >
            Logout
          </Button>
        </Form>
        <hr />
        <Table borderless style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Content</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {/* {console.log("GetToaster: ", toaster)} */}
            {toaster.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.content}</td>
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
      </Container>
    </>
  );
}
