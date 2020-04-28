import React, { useEffect, useState } from "react";
import { Container, FormGroup, Label, Input, Button, Table } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ReactstrapInput } from "reactstrap-formik";

export default function AdminIrvine(props) {
  const [dataIrvine, setDataIrvine] = useState([]);

  useEffect(() => {
    Axios.get("/api/data/irvine/list", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        console.log(resp.data);
        setDataIrvine(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDel = (e, id) => {
    e.preventDefault();
    Axios.get("/api/data/irvine/del/" + id, {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setDataIrvine(dataIrvine.filter((item) => item.id !== id));
        console.log("Irvine Data DELETEd!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Container style={props.conStyle}>
      <Formik
        initialValues={{
          irvineDataId: "",
          irvineDataDate: "",
          irvineDataConfirmed: "",
        }}
        validationSchema={Yup.object({
          irvineDataId: Yup.number()
            .typeError("This filed requires a number!")
            .positive("ID has to be a positive number!")
            .integer("ID has to be an integer!"),
          irvineDataDate: Yup.string()
            .required("Date is required!")
            .matches(
              /[0-1][0-9]\-[0-3][0-9]$/g,
              "Date format is invalid! (i.e. 01-23)"
            ),
          irvineDataConfirmed: Yup.number()
            .typeError("This filed requires a number!")
            .required("The number of confirmed cases is required!")
            .positive("Confirmed number has to be positive!")
            .integer("Confirmed number has to be an integer!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          let data = {
            id: values.irvineDataId,
            date: values.irvineDataDate,
            confirmed: values.irvineDataConfirmed,
          };
          Axios.post("/api/data/irvine/add", data, {
            headers: {
              Authorization: window.localStorage.getItem("token"),
            },
          })
            .then((resp) => {
              setDataIrvine([
                ...dataIrvine,
                {
                  id: values.irvineDataId,
                  date: values.irvineDataDate,
                  confirmed: values.irvineDataConfirmed,
                },
              ]);
              console.log("Irvine Data POSTed!");
            })
            .catch((err) => {
              console.log(err.response);
            });
        }}
      >
        <Form>
          <FormGroup>
            <Label style={props.titleStyle}>Data ID:</Label>
            <Field
              id="irvineDataId"
              name="irvineDataId"
              type="text"
              placeholder="Please input ID..."
              component={ReactstrapInput}
              style={{ display: "inline" }}
            />
          </FormGroup>
          <FormGroup>
            <Label style={props.titleStyle}>Date:</Label>
            <Field
              id="irvineDataDate"
              name="irvineDataDate"
              type="text"
              placeholder="Please input date..."
              component={ReactstrapInput}
              style={{ display: "inline" }}
            />
          </FormGroup>
          <FormGroup>
            <Label style={props.titleStyle}>Confirmed Cases:</Label>
            <Field
              id="irvineDataId"
              name="irvineDataConfirmed"
              type="text"
              placeholder="Please input daily confirmed cases..."
              component={ReactstrapInput}
              style={{ display: "inline" }}
            />
          </FormGroup>
          <FormGroup>
            <Button size="sm" outline color="primary">
              Submit
            </Button>
          </FormGroup>
        </Form>
      </Formik>
      <hr />
      <Table borderless style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {dataIrvine.reverse().map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.confirmed}</td>
              <td>
                <Button
                  color="danger"
                  size="sm"
                  id={item.id}
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
  );
}
