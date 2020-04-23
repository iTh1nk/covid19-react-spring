import React, { useEffect, useState } from "react";
import {
  // Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Form,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import Admin from "./Admin";
import moment from "moment";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import Axios from "axios";

export default function LoginModal(props) {
  const [modal, setModal] = useState(true);
  const toggle = () => {
    window.location.replace("/");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleOnChange = (e) => {
  //   if (e.target.value === process.env.REACT_APP_SELFKEY) {
  //     setIsLoggedIn(true);
  //     localStorage.setItem(
  //       "auth",
  //       JSON.stringify({ isAuthed: true, created: new Date() })
  //     );
  //   }
  // };

  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("/api/user/isAuth", {
      headers: {
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 403) {
          setIsLoggedIn(false);
        }
      });
  }, []);

  function ShowAuthModal() {
    return (
      <div>
        <Modal isOpen={true} backdrop="static">
          <ModalHeader toggle={toggle} charCode="🏡">
            Access Authentication
          </ModalHeader>
          <ModalBody>
            {/* <Input
              onChange={(e) => {
                handleOnChange(e);
              }}
            ></Input> */}
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                username: Yup.string()
                  .min(3, "Username has to be at least 3 characters!")
                  .required("Username is required!"),
                password: Yup.string()
                  .min(6, "Password has to be at least 6 characters!")
                  .matches(
                    /[a-n xyz 0-5]\S/g,
                    "Password doesn't meet requirements!"
                  )
                  .required("Password is required!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                let data = {
                  username: values.username,
                  password: values.password,
                };
                Axios.post("/login", data)
                  .then((resp) => {
                    window.localStorage.setItem(
                      "token",
                      resp.headers.authorization
                    );
                    setIsLoggedIn(true);
                  })
                  .catch((err) => {
                    console.log(err.response);
                    if (err.response.status === 403) {
                      setIsLoggedIn(false);
                    }
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 1000);
                  });
              }}
            >
              {/* {({ handleSubmit, isSubmitting }) => ( */}
              <Form>
                <FormGroup>
                  <Label htmlFor="username">Username: </Label>
                  <Field
                    name="username"
                    type="text"
                    component={ReactstrapInput}
                    style={{ display: "inline" }}
                    placeholder="Input username..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password: </Label>
                  <Field
                    name="password"
                    type="password"
                    component={ReactstrapInput}
                    style={{ display: "inline" }}
                    placeholder="Input password..."
                  />
                </FormGroup>
                <Button
                  size="sm"
                  outline
                  color="primary"
                  type="submit"
                  // disabled={isSubmitting}
                  // disabled={submitting}
                >
                  Submit
                </Button>
              </Form>
              {/* )} */}
            </Formik>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <ShowAuthModal />;
  }
  //  else if (!getLocalStorage.isAuthed && !isLoggedIn) {
  //   return <ShowAuthModal />;
  // } else if (
  //   moment(new Date()).diff(getLocalStorage.created, "minutes") > 600
  // ) {
  //   localStorage.removeItem("auth");
  //   window.location.reload();
  // }

  return <Admin />;
}
