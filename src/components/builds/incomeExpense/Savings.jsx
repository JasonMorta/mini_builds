import React, { useContext, useState } from "react";
import { SharedState } from "./IEMain";
import Button from "react-bootstrap/Button";
import CSS from "./Savings.module.css";
import SavingsModal from "./SavingsModal";
import produce from "immer";
import { formatCurrency } from "./Helpers";

export default function Savings() {
  const value = useContext(SharedState);
  const [state, setState] = value;
  const [modalShow, setModalShow] = useState(false);

  //save input and update current savings and disposableIncome value
  // [BLOCK: SAVE_SAVINGS]
  function handleSave() {
    const available = state.incomeTotal - state.expenseTotal - state.savings;

    if (state.inputs.savings <= 0 || state.inputs.savings > available) {
      return; // silently ignore invalid input
    }

    setState(
      produce((draft) => {
        draft.savings += draft.inputs.savings;
        draft.inputs.savings = 0;
      })
    );

    setModalShow(false);
  }

  return (
    <section className={CSS.savingsMain}>
      <div className={CSS.box_container}>
        <div className={CSS.box_container_inner}>
          <h6 style={{ textAlign: "end", margin: 0 }}>Current Savings</h6>

          <h5
            style={{
              textAlign: "start",
            }}
          >
            {formatCurrency(state.savings)}
          </h5>
          <Button
            variant="primary"
            disabled={
              state.incomeTotal - state.expenseTotal - state.savings <= 0
            }
          >
            Save some
          </Button>
          <SavingsModal show={modalShow} onHide={() => handleSave()} />
        </div>
      </div>
    </section>
  );
}
