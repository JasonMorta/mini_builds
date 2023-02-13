//Income and Expense calculation

import React, { useContext, useEffect, useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import CSS from "./I&E.module.css";
import { Suspense, lazy } from "react";
import DisposableIncome from "./DisposableIncome";
import { StateContext } from "../../../StateManager";
//const DisposableIncome = lazy(() => import("./DisposableIncome.jsx"));

export default function Main() {
  console.log("Main");
  /* ==================
  Calculate all Totals 
  =====================*/
  const value = useContext(StateContext);
  //destructure main state
  const [options, setOptions] = value;
  let updatedState = options;

  const [dis, setDis] = useState(<Expense getTotal={totalGen} />);
  useEffect(() => {
    setTimeout(() => {
      totalGen();
    }, 1000);
  }, []);

  function totalGen() {
    let allExpenseValues = 0;
    let allIncomeValues = 0;
    console.log("====================================");
    console.log("totalGen");
    console.log(options.incomeAndExpense);
    console.log("====================================");

    //calculate Expense total
    options.incomeAndExpense.expenseList.map(
      (value, i) => (allExpenseValues += value.amount)
    );
    setOptions((prev) => ({
      ...prev,
      incomeAndExpense: {
        ...prev.incomeAndExpense,
        expenseTotal: allExpenseValues,
      },
    }));

    console.log("Expense", options.incomeAndExpense.expenseTotal);

    //calculate Income total
    options.incomeAndExpense.incomeList.map(
      (value, i) => (allIncomeValues += value.amount)
    );
    //set Income total
    setOptions((prev) => ({
      ...prev,
      incomeAndExpense: {
        ...prev.incomeAndExpense,
        incomeTotal: allIncomeValues,
      },
    }));
    console.log("income", options.incomeAndExpense.incomeTotal);

    //calculate Disposable Income
    setOptions((prev) => ({
      ...prev,
      incomeAndExpense: {
        ...prev.incomeAndExpense,
        disposableIncome: allIncomeValues - allExpenseValues,
      },
    }));

    allIncomeValues = 0;
    allExpenseValues = 0;
  }

  return (
    <div className={CSS.EAndE_blocks}>
      <Income getIncomeTotal={totalGen} />
      <DisposableIncome updateDisposable={totalGen} />
      {dis}
      {/* <Suspense fallback={<div className="lds-dual-ring"></div>}> */}

      {/* </Suspense> */}
    </div>
  );
}
