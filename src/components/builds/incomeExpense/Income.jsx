import React, { useContext, useState, useEffect } from "react";
import CSS from "./I&E.module.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import NewEntry from "./NewEntryModal";
import { SharedState } from "./IEMain";
import produce from "immer";

export default function Income() {
  const value = useContext(SharedState);
  //destructure main state
  const [state, setState] = value;

  let copyState = state;
  const [show, setShow] = useState(false);
  //const [reload, setReload] = useState(true);
  const [total, setTotal] = useState(0);
  // let saveTotal = 0;

  //Edit Selected entry
  function handleEdit(key, i) {
    setShow(true);
    setState(
      produce((state) => {
        state.inputs.heading = "Edit Entry";
      })
    );

    //Fille inputs with selected entry values
    if (state.inputs.heading === "Edit Entry") {
      setState(
        produce((state) => {
          state.inputs.name = key.name;
          state.inputs.amount = key.amount;
          state.inputs.recurring = key.recurring;
          state.inputs.index = i;
        })
      );
    }
  }

  //Delete entry
  function handleDelete(key, i) {
    setState(
      produce((state) => {
        state.incomeList.splice(i, 1);
      })
    );
  }

  //Handle both Add new entry & update selected entry
  function handleSave() {
    //Adds new income entry to list
    if (state.inputs.heading === "Add New Entry") {
      //create the new object
      let newEntry = {
        name: state.inputs.name,
        amount: Number(state.inputs.amount),
        recurring: state.inputs.recurring,
      };

      //State new entry to state
      setState(
        produce((state) => {
          state.incomeList.push(newEntry);
        })
      );
      setShow(false); //close modal
    } else if (state.inputs.heading === "Edit Entry") {
      //Updated the selected entry
      //get the current index
      let i = state.inputs.index;
      let updatedEntry = {
        name: state.inputs.name,
        amount: state.inputs.amount,
        recurring: state.inputs.recurring,
      };

      //update object at index with inputs
      setState(
        produce((state) => {
          state.incomeList[i] = updatedEntry;
        })
      );
    }
    setShow(false);
  }

  //calculate the income total
  useEffect(() => {
    setTotal(0);
    state.incomeList.forEach((el) => {
      setTotal((prev) => (prev += Number(el.amount)));
    });
    setState(
      produce((state) => {
        state.incomeTotal = total;
      })
    );
  }, [state]);

  function handleClose() {
    setShow(false);
  }

  //Open modal for new entry
  function addNewIncome() {
    setShow(true);

    setState(
      produce((state) => {
        state.inputs.heading = "Add New Entry";
      })
    );

    //Clear input fields
    if (state.inputs.heading === "Add New Entry") {
      setState(
        produce((state) => {
          state.inputs.name = "";
          state.inputs.amount = "";
          state.inputs.recurring = false;
        })
      );
    }
  }

  //Income table
  const incomeSection = state.incomeList.map((key, i) => (
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
        <h1>Income</h1>

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
          <tbody>{incomeSection}</tbody>
        </Table>
        <Button variant="success" onClick={() => addNewIncome()}>
          Add new entry
        </Button>
        <div className={CSS.income_total}>
          <p
            style={{
              textAlign: "end",
              margin: 0,
            }}
          >
            Total
          </p>
          <p
            style={{
              textAlign: "end",
              margin: 0,
            }}
          >
            <b> R{total}</b>
          </p>
        </div>
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
