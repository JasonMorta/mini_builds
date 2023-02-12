import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { StateContext } from "../../../StateManager";

export default function Inputs({ name, amount, recurring }) {
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  //Update state by covering state to variable,
  //updating variable,
  //update state with variable
  function AddName(e) {
    let updatedOptions = options;
    updatedOptions.incomeAndExpense.inputs.name = e.target.value;
    setOptions(updatedOptions);
  }

  //Updated state with spread...
  function AddAmount(e) {
    setOptions((prev) => ({
      ...prev,
      incomeAndExpense: {
        ...prev.incomeAndExpense,
        inputs: {
          ...prev.incomeAndExpense.inputs,
          amount: e.target.value,
        },
      },
    }));
  }

  function isRecurring(e) {
    let updatedOptions = options;
    updatedOptions.incomeAndExpense.inputs.recurring = e.target.checked;
    setOptions(updatedOptions);
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
            defaultValue={options.incomeAndExpense.inputs.name}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {options.incomeAndExpense.inputs.heading === "savings" ? (
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
                defaultValue={options.incomeAndExpense.inputs.amount}
                onChange={(e) => AddAmount(e)}
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label={`Recurring`}
              defaultChecked={options.incomeAndExpense.inputs.recurring}
              onChange={(e) => isRecurring(e)}
            />
          </>
        )}
      </Form>
    </div>
  );
}
