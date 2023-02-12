//Income and Expense calculation

import React from "react";
import Expense from "./Expense";
import Income from "./Income";
import CSS from "./I&E.module.css";
import { Suspense, lazy } from "react";
const DisposableIncome = lazy(() => import("./DisposableIncome.jsx"));

export default function Main() {
  return (
    <div className={CSS.EAndE_blocks}>
      <Income />
      <Expense />
      <Suspense fallback={<div class="lds-dual-ring"></div>}>
        <DisposableIncome />
      </Suspense>
    </div>
  );
}
