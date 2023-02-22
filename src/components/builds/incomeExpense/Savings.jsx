import React, { useContext, useState } from "react";
import { SharedState } from "./IEMain";
import Button from 'react-bootstrap/Button';
import CSS from "./Savings.module.css";
import SavingsModal from "./SavingsModal";
import produce from "immer";

export default function Savings() {
  const value = useContext(SharedState);
  const [state,setState ] = value;
  const [modalShow, setModalShow] = useState(false);


  
//save input and update current savings and disposableIncome value
  function handleSave(){
        setModalShow(false)
        setState(
          produce((state) => {
            state.savings = (state.savings + state.inputs.savings);
            //state.disposableIncome = (state.disposableIncome - state.savings)
          })
        );
  }


  


  return (
    <section className={CSS.savingsMain}>
      <div className={CSS.box_container}>
        <div className={CSS.box_container_inner}>
          <h6 style={{ textAlign: "end",margin: 0,}}>
            Current Savings
          </h6>
  
          <h5
            style={{
              textAlign: "start",
            }}
          >
            R{state.savings}
          </h5>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Save some
          </Button>
          <SavingsModal
          show={modalShow}
          onHide={() => handleSave()}
          />
        </div>
      </div>
    </section>
  );
}
