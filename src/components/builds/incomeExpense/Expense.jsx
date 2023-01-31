import React, { useState } from 'react'
import CSS from './I&E.module.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import NewEntry from './NewEntry';

export default function Expense(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


let income = [{
    name: "Job 1",
    amount: 999,
    recurring: true
}]



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
        <td><Button variant="primary" onClick={handleShow}>
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
              <h1>Expenses</h1>
              {display}
              <Button variant="success">Add new entry</Button>
            </div>
            <NewEntry 
            handleShow={()=> handleShow()}
            handleClose={()=> handleClose()}
            show={show}/>
          </container>
    </div>
  )
}
