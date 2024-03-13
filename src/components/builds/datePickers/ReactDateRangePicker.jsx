import React from "react";
// you will also need the css that comes with bootstrap-daterangepicker
import { DateRangePicker, Stack } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import css from './datePicker-styles.module.css'


export default function ReactDateRangePicker() {

  return (
    <div className={css.first_picker}>
      <h1>DateRangePicker</h1>
      <a href="https://rsuitejs.com/components/date-range-picker/">
        react-date-range
      </a>
      <DateRangePicker
        placeholder="Select Date Range"
      />
    </div>
  );
}
