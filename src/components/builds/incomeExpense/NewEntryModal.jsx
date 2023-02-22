import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SharedState } from "./IEMain";
import Inputs from "./Inputs";

export default function NewEntry(props) {
  const value = useContext(SharedState);
  //destructure main state
  const [state, ] = value;

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{state.inputs.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Inputs />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
