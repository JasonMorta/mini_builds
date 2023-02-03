import React, { useContext, useState } from 'react'
import CSS from './I&E.module.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NewEntry from './NewEntryModal';
import { StateContext } from '../../../StateManager';

export default function Income(props) {
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;

  let updatedState = options;

  const [show, setShow] = useState(false);



  //Edit Selected entry
  function handleEdit(key, i) {
    console.log(key, i);
    setShow(true);
    updatedState.incomeAndExpense.inputs.heading = "Edit Entry";
    setOptions(updatedState);
        //Fille inputs with selected entry
    if (options.incomeAndExpense.inputs.heading === "Edit Entry") {
      updatedState.incomeAndExpense.inputs.name = key.name;
      updatedState.incomeAndExpense.inputs.amount = key.amount;
      updatedState.incomeAndExpense.inputs.recurring = key.recurring;
      updatedState.incomeAndExpense.inputs.index = i;
      setOptions(updatedState);
    }
    
   


    

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
          }
      updatedState.incomeAndExpense.incomeList.push(newEntry)
      setOptions(updatedState);
      console.log("Income entry added!");
      setShow(false);//close modal
    } else {
    //Updated the selected entry
    //get the current index
    let i = updatedState.incomeAndExpense.inputs.index
    //update object at index with inputs
    updatedState.incomeAndExpense.incomeList[i] = updatedState.incomeAndExpense.inputs
    //set he main state for rerender
    setOptions(updatedState);
    console.log(options.incomeAndExpense);
    console.log("Updated!");
    setShow(false);//close modal
    }

    console.log(options.incomeAndExpense.incomeList);
  }

  function handleClose() {
    setShow(false);
  }

  function checkFields() {
    console.log("testing");
  }

 //Open modal for new entry
 //Clear all input values
  function addNewIncome(){
    setShow(true)
    updatedState.incomeAndExpense.inputs.heading = "Add New Entry";
    setOptions(updatedState);

    if (options.incomeAndExpense.inputs.heading === "Add New Entry") {
      updatedState.incomeAndExpense.inputs.name = "";
      updatedState.incomeAndExpense.inputs.amount = "";
      updatedState.incomeAndExpense.inputs.recurring = "";
      setOptions(updatedState);
    }

   

  }

  //Income table

      let display = options.incomeAndExpense.incomeList.map((key, i) => (
        <tr>
          <td>{i}</td>
          <td>{key.name}</td>
          <td>R{key.amount} P/M</td>
          <td>{key.recurring ? "YES" : "NO"}</td>
          <td>
            <Button variant="primary" onClick={() => handleEdit(key, i)}>
              edit
            </Button>
          </td>
          <td>
            <Button variant="danger">X</Button>
          </td>
        </tr>
        ));

 

  return (
    <div>
      <container className={CSS.box_container}>
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
      <tbody>
          {display}
          </tbody>
    </Table>
          <Button variant="success" onClick={() => addNewIncome()}>
            Add new entry
          </Button>
        </div>

        {/* New Entry Modal component */}
        <NewEntry
          checkFields={checkFields}
          handleShow={() => setShow(true)}
          handleSave={() => handleSave()}
          handleClose={() => handleClose()}
          show={show}
        />
      </container>
    </div>
  );
}
