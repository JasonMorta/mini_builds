import React, { useContext, useState } from "react";
import CSS from "./I&E.module.css";
import { SharedState } from "./IEMain";

export default function DisposableIncome() {
  const value = useContext(SharedState);
  //destructure main state
  const [state, setState] = value;
  let updatedState = state;

  // function handleSavings() {
  //   console.log("saved");
  //   updatedState.incomeAndExpense.inputs.heading = "savings";
  //   setState(updatedState);
  //   console.log(state.incomeAndExpense);
  // }

  return (
    <div className={CSS.box_container_DI}>
      <div className={CSS.box_container_inner_DI}>
        <h6
          style={{
            textAlign: "end",
            margin: 0,
          }}
        >
          Disposable income
        </h6>

        <h5
          style={{
            textAlign: "end",
          }}
        >
          R{state.incomeTotal - state.expenseTotal}
        </h5>
        {/* <button className={CSS.button} onClick={() => handleSavings()}>
          Add to savings
        </button> */}
      </div>
    </div>
  );
}
