import React, { useEffect, useState } from "react";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Admin from "./Admin";

export default function LoginModal(props) {
  const [modal, setModal] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleOnChange = (e) => {
    if (e.target.value === "0728") {
      setIsLoggedIn(true);
      localStorage.setItem("auth", true)
    }
  };

  if ( !localStorage.getItem("auth") && !isLoggedIn) {
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
  return <Admin />;
}