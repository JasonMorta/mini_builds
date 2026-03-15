import React from 'react';
import css from './datePicker-styles.module.css';
import ReactDateRangePicker from './ReactDateRangePicker';
import PredefinedDateRanges from './PredefinedDateRanges';
import BasicDatePicker from './BasicDatePicker';

export default function DatePickerMain() {
  return (
    <div className={`${css.main_datePicker} datepickers-build`}>
      <ReactDateRangePicker />
      <PredefinedDateRanges />
      {/* BasicDatePicker is kept for future comparison work instead of removing it. */}
      {/* <BasicDatePicker /> */}
    </div>
  );
}
