//Income and Expense calculation

import React, { createContext, useEffect, useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import CSS from "./I&E.module.css";
import { Suspense, lazy } from "react";
import Savings from "./Savings";

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
      savings: 0
    },
    expenseTotal: 0,
    incomeTotal: 0,
    savings: 0,
    disposableIncome: 0
    
  });



  return (
    <SharedState.Provider value={[state, setState]} className="App">
      <div className={CSS.IAndE_blocks}>
        <Income />
        <Expense />
       <Suspense fallback={<div className="lds-dual-ring"></div>}>
        <aside>
            <DisposableIncome />
        </aside>
        </Suspense>
        <Savings />
      </div>
      
    </SharedState.Provider>
  );
}
