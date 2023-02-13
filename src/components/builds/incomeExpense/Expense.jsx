import React, { useContext, useState } from "react";
import CSS from "./I&E.module.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import NewEntry from "./NewEntryModal";
import { StateContext } from "../../../StateManager";
import { useEffect } from "react";

export default function Expense(props) {
  console.log("Expense");
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;
  let updatedState = options;
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(true);
  let saveTotal = 0;
  //Edit Selected entry
  function handleEdit(key, i) {
    setShow(true);
    updatedState.incomeAndExpense.inputs.heading = "Edit Entry";
    setOptions(updatedState);

    //Fille inputs with selected entry values
    if (options.incomeAndExpense.inputs.heading === "Edit Entry") {
      updatedState.incomeAndExpense.inputs.name = key.name;
      updatedState.incomeAndExpense.inputs.amount = key.amount;
      updatedState.incomeAndExpense.inputs.recurring = key.recurring;
      updatedState.incomeAndExpense.inputs.index = i;
      setOptions(updatedState);
    }
  }

  //Delete entry
  function handleDelete(key, id) {
    updatedState = options;
    updatedState.incomeAndExpense.inputs.heading = "";
    updatedState.incomeAndExpense.expenseList.splice(id, 1);
    setReload((prev) => !prev);
    return setOptions(updatedState);
  }

  //Handle both Add new entry & update selected entry
  function handleSave() {
    //Adds new income entry to list
    if (options.incomeAndExpense.inputs.heading === "Add New Entry") {
      //create the new object
      let newEntry = {
        name: updatedState.incomeAndExpense.inputs.name,
        amount: updatedState.incomeAndExpense.inputs.amount,
        recurring: updatedState.incomeAndExpense.inputs.recurring,
      };

      updatedState.incomeAndExpense.expenseList.push(newEntry);
    } else if (options.incomeAndExpense.inputs.heading === "Edit Entry") {
      //Updated the selected entry
      //get the current index
      let i = updatedState.incomeAndExpense.inputs.index;
      let updatedEntry = {
        name: updatedState.incomeAndExpense.inputs.name,
        amount: updatedState.incomeAndExpense.inputs.amount,
        recurring: updatedState.incomeAndExpense.inputs.recurring,
      };

      //update object at index with inputs
      updatedState.incomeAndExpense.expenseList[i] = updatedEntry;
      //set he main state for rerender
    }
    props.getTotal();
    setShow(false); //close modal
  }

  function handleClose() {
    setShow(false);
  }

  //Open modal for new entry
  //Clear all input values
  function addNewIncome() {
    setShow(true);
    updatedState.incomeAndExpense.inputs.heading = "Add New Entry";
    setOptions(updatedState);

    if (options.incomeAndExpense.inputs.heading === "Add New Entry") {
      updatedState.incomeAndExpense.inputs.name = "";
      updatedState.incomeAndExpense.inputs.amount = "";
      updatedState.incomeAndExpense.inputs.recurring = false;
      setOptions(updatedState);
    }
  }

  //Income table
  let display = options.incomeAndExpense.expenseList.map((key, i) => (
    <tr key={i}>
      <td>{i}</td>
      <td>{key.name}</td>
      <td>
        R{key.amount} <sup style={{ fontSize: "10px" }}>p/m</sup>
      </td>
      <td>{key.recurring ? "YES" : "NO"}</td>
      <td>
        <Button variant="primary" onClick={() => handleEdit(key, i)}>
          edit
        </Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => handleDelete(key, i)}>
          X
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className={CSS.box_container}>
      <div className={CSS.box_container_inner}>
        <h1>Expenses</h1>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Recurring</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{display}</tbody>
        </Table>
        <Button variant="success" onClick={() => addNewIncome()}>
          Add new entry
        </Button>
        <h5
          style={{
            textAlign: "end",
            margin: 0,
          }}
        >
          <small>Total</small>
        </h5>
        <h5
          style={{
            textAlign: "end",
            margin: 0,
          }}
        >
          R{options.incomeAndExpense.expenseTotal}
        </h5>
      </div>

      {/* New Entry Modal component */}
      <NewEntry
        handleShow={() => setShow(true)}
        handleSave={() => handleSave()}
        handleClose={() => handleClose()}
        show={show}
      />
    </div>
  );
}
