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
// [BLOCK: INITIAL_STATE]
const defaultState = {
  incomeList: [
    { name: "Online sales", amount: 4000, recurring: true },
    { name: "Main Job", amount: 7000, recurring: true },
    { name: "Hustling", amount: 1500, recurring: true },
  ],
  expenseList: [
    { name: "Home Utilities", amount: 1500, recurring: true },
    { name: "Payed", amount: 1400, recurring: true },
    { name: "Rent", amount: 5500, recurring: true },
  ],
  inputs: {
    heading: "",
    name: "",
    amount: "",
    recurring: false,
    index: 0,
    savings: 0,
  },
  incomeTotal: 0,
  expenseTotal: 0,
  savings: 0,
  disposableIncome: 0,
};

// [BLOCK: STATE_INIT_WITH_LOCALSTORAGE]
const [state, setState] = useState(() => {
  try {
    const stored = localStorage.getItem('STORAGE_KEY');
    return stored ? JSON.parse(stored) : defaultState;
  } catch (error) {
    console.error("Failed to load state from localStorage", error);
    return defaultState;
  }
});


// [BLOCK: SYNC_STATE_TO_LOCALSTORAGE]
useEffect(() => {
  try {
    localStorage.setItem('STORAGE_KEY', JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to localStorage", error);
  }
}, [state]);



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
