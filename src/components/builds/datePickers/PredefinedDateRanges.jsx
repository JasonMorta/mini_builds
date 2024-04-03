import React from 'react'
import { DateRangePicker, Stack } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { compareAsc, format } from "date-fns";

export default function PredefinedDateRanges() {

    const predefinedRanges = [
        {
          label: 'Today',
          value: [new Date(), new Date()],
          placement: 'left'
        },
        {
          label: 'Yesterday',
          value: [addDays(new Date(), -1), addDays(new Date(), -1)],
          placement: 'left'
        },
        {
          label: 'This week',
          value: [startOfWeek(new Date()), endOfWeek(new Date())],
          placement: 'left'
        },
        {
          label: 'Last 7 days',
          value: [subDays(new Date(), 6), new Date()],
          placement: 'left'
        },
        {
          label: 'Last 30 days',
          value: [subDays(new Date(), 29), new Date()],
          placement: 'left'
        },
        {
          label: 'This month',
          value: [startOfMonth(new Date()), new Date()],
          placement: 'left'
        },
        {
          label: 'Last month',
          value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
          placement: 'left'
        },
        {
          label: 'This year',
          value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
          placement: 'left'
        },
        {
          label: 'Last year',
          value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
          placement: 'left'
        },
        {
          label: 'All time',
          value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
          placement: 'left'
        },
        {
          label: 'Last week',
          closeOverlay: false,
          value: value => {
            const [start = new Date()] = value || [];
            return [
              addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
              addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
            ];
          },
          appearance: 'default'
        },
        {
          label: 'Next week',
          closeOverlay: false,
          value: value => {
            const [start = new Date()] = value || [];
            return [
              addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
              addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
            ];
          },
          appearance: 'default'
        }
      ];
  return (
  <div className={'css.second_picker'}>
    <h3>Predefined date ranges</h3>
      <DateRangePicker
        ranges={predefinedRanges}
        format="dd/MM/yyyy"
        label="Date Range"
        placeholder="Placement left"
        style={{ width: 300 }}
        onClean={() => console.log("cleared")}
        onOpen={() => console.log('open')}
        onOk={value => console.log(value)}// When click ok button
        onSelect={value => format(new Date(value), 'dd/mm/yyyy') }// When select a date
        /> 
  </div>
  )
}
