import React, { useContext, useState } from "react";
import { StateContext } from "../../../StateManager";
import CSS from "./I&E.module.css";

export default function DisposableIncome() {
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;
  return (
    <div className={CSS.box_container_Savings}>
      <div className={CSS.box_container_inner_Savings}>
        <h6
          style={{
            textAlign: "end",
            margin: 0,
          }}
        >
          Savings
        </h6>

        <h5
          style={{
            textAlign: "end",
          }}
        >
          R
        </h5>
      </div>
    </div>
  );
}
