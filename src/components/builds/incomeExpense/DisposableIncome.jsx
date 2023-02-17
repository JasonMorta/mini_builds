import React, { useContext, useState } from "react";
import { StateContext } from "../../../StateManager";
import CSS from "./I&E.module.css";

export default function DisposableIncome() {
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;
  let updatedState = options;

  function handleSavings() {
    console.log("saved");
    updatedState.incomeAndExpense.inputs.heading = "savings";
    setOptions(updatedState);
    console.log(options.incomeAndExpense);
  }

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
          R{options.incomeAndExpense.disposableIncome}
        </h5>
        <button className={CSS.button} onClick={() => handleSavings()}>
          Add to savings
        </button>
      </div>
    </div>
  );
}
