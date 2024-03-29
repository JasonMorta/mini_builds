import produce from 'immer';
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SharedState } from './IEMain';

export default function SavingsModal(props) {

    const value = useContext(SharedState);
    const [state, setState] = value;

    function saveInput(e) {
      setState(
        produce((state) => {
          state.inputs.savings = Number(e.target.value);
        })
      );
    }

    const labelStyle = {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row"
    }


    return (
        <Modal
       
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body >
            <h4>Add to savings</h4>
            <Form.Label style={labelStyle}>Amount to save from: R{(state.incomeTotal - state.expenseTotal) - state.savings}
             <b>Current Savings: R{state.savings}</b></Form.Label>
              <Form.Control
                type="number"
                placeholder="R"
                autoFocus={true}
                defaultValue={state.savings}
                onChange={(e)=> saveInput(e)}
              />
            
          </Modal.Body>
          <Modal.Footer style={{padding: '0px'}}>
            <Button onClick={props.onHide}>Save</Button>
          </Modal.Footer>
        </Modal>
      );
}
