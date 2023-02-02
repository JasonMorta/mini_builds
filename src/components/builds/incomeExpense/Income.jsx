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

  let updatedState = options

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (key) => {
      
      updatedState.incomeAndExpense.inputs.heading = "Edit Entry"
      updatedState.incomeAndExpense.inputs.name = key.name
      updatedState.incomeAndExpense.inputs.amount = key.amount
      updatedState.incomeAndExpense.inputs.recurring = key.recurring

      setOptions(updatedState)
      console.log(options);
      setShow(true)
    };

//income object
let income = [{
    name: "Job 1",
    amount: 98899,
    recurring: true
}]

function checkFields(){
  console.log("testing");
}


//Income table
let display = income.map((key, i) => (
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
      <tr>
      <td>{i}</td>
        <td>{key.name}</td>
        <td>R{key.amount} P/M</td>
        <td>{key.recurring ? "YES" : "NO"}</td>
        <td><Button variant="primary" onClick={()=> handleShow(key)}>
          edit
        </Button></td>
        <td><Button variant="danger">X</Button></td>
      </tr>
      </tbody>
    </Table>
));

  return (
    <div>

         <container className={CSS.box_container}>
            <div className={CSS.box_container_inner}>
              <h1>Income</h1>
              {display}
              <Button variant="success"  onClick={()=> handleShow()}>Add new entry</Button>
            </div>

            {/* New Entry Modal component */}
            <NewEntry 
            checkFields={checkFields}
            handleShow={()=> handleShow()}
            handleClose={()=> handleClose()}
            show={show}/>

          </container>
    </div>
  )
}
