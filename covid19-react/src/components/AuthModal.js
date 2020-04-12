import React, { useEffect, useState } from "react";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Admin from "./Admin";

export default function LoginModal(props) {
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(true);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleOnChange = (e) => {
    if (e.target.value === "0728") {
      setIsLoggedIn(true);
    }
  };

  const toggle = () => setModal(!modal);

  const changeBackdrop = (e) => {
    let value = e.target.value;
    if (value !== "static") {
      value = JSON.parse(value);
    }
    setBackdrop(value);
  };

  const changeKeyboard = (e) => {
    setKeyboard(e.currentTarget.checked);
  };

  if (!isLoggedIn) {
    return (
      <div>
        {/* <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Label for="backdrop">Backdrop value</Label>{" "}
            <Input
              type="select"
              name="backdrop"
              id="backdrop"
              onChange={changeBackdrop}
            >
              <option value="true">true</option>
              <option value="false">false</option>
              <option value="static">"static"</option>
            </Input>
          </FormGroup>
          <FormGroup className="mx-2" check>
            <Label check>
              <Input
                type="checkbox"
                checked={keyboard}
                onChange={changeKeyboard}
              />{" "}
              Keyboard
            </Label>
          </FormGroup>{" "}
          <Button color="danger" onClick={toggle}>
            {buttonLabel}
          </Button>
        </Form> */}
        <Modal
          isOpen={modal}
          // toggle={toggle}
          // className={className}
          backdrop="static"
          // keyboard={keyboard}
        >
          <ModalHeader>Access Authentication</ModalHeader>
          <ModalBody>
            <Input
              onChange={(e) => {
                handleOnChange(e);
              }}
            ></Input>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  return <Admin />;
}
