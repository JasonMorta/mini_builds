//Income and Expense calculation

import React, { createContext, useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import CSS from "./I&E.module.css";
import { Suspense, lazy } from "react";

const DisposableIncome = lazy(() => import("./DisposableIncome.jsx"));

export const SharedState = createContext();

export default function Main() {
  //Income and Expense state shared with all children
  const [state, setState] = useState({
    incomeList: [
      {
        name: "Online sales",
        amount: 4000,
        recurring: true,
      },
      {
        name: "Main Job",
        amount: 7000,
        recurring: true,
      },
      {
        name: "Hustling",
        amount: 1500,
        recurring: true,
      },
    ],
    expenseList: [
      {
        name: "Home Utilities",
        amount: 1500,
        recurring: true,
      },
      {
        name: "Payed",
        amount: 1400,
        recurring: true,
      },
      {
        name: "Rent",
        amount: 5500,
        recurring: true,
      },
    ],
    inputs: {
      heading: "",
      name: "",
      amount: "",
      recurring: false,
      index: 0,
    },
    expenseTotal: 0,
    incomeTotal: 0,
  });

  return (
    <SharedState.Provider value={[state, setState]} className="App">
      <div className={CSS.EAndE_blocks}>
        <Income />
        <Expense />

        <Suspense fallback={<div class="lds-dual-ring"></div>}>
          <DisposableIncome />
        </Suspense>
      </div>
    </SharedState.Provider>
  );
}
