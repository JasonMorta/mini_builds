import React from 'react'
import css from './datePicker-styles.module.css'
import ReactDateRangePicker from './ReactDateRangePicker'
import PredefinedDateRanges from './PredefinedDateRanges'

export default function DatePickerMain() {
  return (
    <div className={css.main_datePicker}>
        <ReactDateRangePicker />
        <PredefinedDateRanges />
    </div>
  )
}
