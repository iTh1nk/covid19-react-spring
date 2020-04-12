import React, { useEffect, useState } from "react";
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

export default function Admin() {
  const [toaster, setToaster] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    Axios.get("/api/toaster")
      .then((resp) => {
        setToaster(resp.data);
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
    Axios.delete("/api/toaster/" + id)
      .then((resp) => {
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
