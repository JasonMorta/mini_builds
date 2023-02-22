import produce from "immer";
import React, { useContext, useEffect, useState } from "react";
import CSS from "./I&E.module.css";
import { SharedState } from "./IEMain";

export default function DisposableIncome() {
  const value = useContext(SharedState);
  //destructure main state
  const [state,setState ] = value;
  const [test, setTest] = useState('Disposable income')


  return (
    <div className={CSS.box_container_DI}>
      <div className={CSS.box_container_inner_DI}>
        <h6
          style={{
            textAlign: "end",
            margin: 0,
            fontSize: 'small'
          }}
        >
            {test}
        </h6>

        <h5
          style={{
            textAlign: "end",
            color: (state.incomeTotal - state.expenseTotal) - state.savings < 0 ? '#dc3545': 'initial'
          }}
        >
          R{(state.incomeTotal - state.expenseTotal) - state.savings}
        </h5>
        {/* <button className={CSS.button} onClick={() => handleSavings()}>
          Add to savings
        </button> */}
      </div>
    </div>
  );
}
