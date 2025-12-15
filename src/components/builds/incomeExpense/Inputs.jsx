import produce from "immer";
import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SharedState } from "./IEMain";

export default function Inputs() {
  const value = useContext(SharedState);
  //destructure main state
  const [state, setState] = value;

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  //Update state by covering state to variable,
  //updating variable,
  //update state with variable
  function AddName(e) {
    setState(
      produce((state) => {
        state.inputs.name = e.target.value;
      })
    );
  }

  //Updated state with immer...
  function AddAmount(e) {
    setState(
      produce((state) => {
        state.inputs.amount = e.target.value;
      })
    );
  }

  // [BLOCK: RECURRING_CHECKBOX]
  function isRecurring(e) {
    setState(
      produce((state) => {
        state.inputs.recurring = e.target.checked;
      })
    );
  }

  return (
    <div className="modal_inputs" style={style}>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
          <Form.Control
            placeholder="Name"
            aria-label="Name"
            onChange={(e) => AddName(e)}
            defaultValue={state.inputs.name}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {state.inputs.heading === "savings" ? (
          <></>
        ) : (
          <>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
              <Form.Control
                placeholder="Amount"
                aria-label="Amount"
                type="number"
                value={state.inputs.amount}
                onChange={AddAmount}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Check
              type="checkbox"
              label="Recurring"
              checked={state.inputs.recurring}
              onChange={isRecurring}
            />
          </>
        )}
      </Form>
    </div>
  );
}
