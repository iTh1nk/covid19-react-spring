import React, { useEffect, useState } from "react";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Admin from "./Admin";
import moment from "moment";

export default function LoginModal(props) {
  const [modal, setModal] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleOnChange = (e) => {
    if (e.target.value === "0728") {
      setIsLoggedIn(true);
      localStorage.setItem(
        "auth",
        JSON.stringify({ isAuthed: true, created: new Date() })
      );
    }
  };

  console.log(JSON.parse(localStorage.getItem("auth")));
  const getLocalStorage = JSON.parse(localStorage.getItem("auth"));

  function ShowAuthModal() {
    return (
      <div>
        <Modal isOpen={modal} backdrop="static">
          <ModalHeader>Access Authentication</ModalHeader>
          <ModalBody>
            <Input
              onChange={(e) => {
                handleOnChange(e);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }

  if (!getLocalStorage) {
    return <ShowAuthModal />;
  } else if (!getLocalStorage.isAuthed && !isLoggedIn) {
    return <ShowAuthModal />;
  } else if (moment(new Date()).diff(getLocalStorage.created, "minutes") > 60) {
    localStorage.removeItem("auth");
    window.location.reload();
  }

  return <Admin />;
}
