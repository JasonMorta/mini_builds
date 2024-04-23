import React from 'react'
import { DateRangePicker } from 'rsuite'; // install rsuite package
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import {format, subWeeks } from "date-fns";// install date-fns package

export default function PredefinedDateRanges() {
  const [selectedDates, setSelectedDates] = React.useState([new Date(), new Date()]) // [new Date(), new Date()
    
  // Range picker predefined ranges
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
          label: 'Last week',
          value: [startOfWeek(subDays(new Date(), 7)), endOfWeek(subDays(new Date(), 7))],
          placement: 'left'
        },
        {
          label: "Last 2 weeks",
          value: [startOfWeek(subWeeks(new Date(), 2)), endOfWeek(subWeeks(new Date(), 1))],
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

     async function onOk(value) {
      console.log('onOk', JSON.stringify(value))
      setSelectedDates(value)
     }

     async function onClean() {
      // choose a date message
      console.log('cleaned')
      setSelectedDates(['', ''])
    }

    async function onShortcutClick(value) {
      console.log('onShortcutClick', value)
      const shortCutDate = value.value
      setSelectedDates(shortCutDate)
    }


  return (
  <div className={'css.second_picker'}>
    <h3 style={{margin: "20px"}}>Predefined date ranges</h3>
      <DateRangePicker
        ranges={predefinedRanges}
        format="dd/MM/yyyy"
        label="Date Range"
        placeholder="Placement left"
        style={{ width: 300 }}
        onClean={() => onClean()}
        onOpen={() => console.log('open')}
        onOk={value => onOk(value)}// When click ok button
        onSelect={value => format(new Date(value), 'dd/mm/yyyy') }// When select a date
        onShortcutClick={value => onShortcutClick(value)} // When click predefined date range
        /> 
        <h5>{selectedDates[0] && selectedDates[1] ? `Selected date range: ${format(selectedDates[0], 'dd/MM/yyyy')} - ${format(selectedDates[1], 'dd/MM/yyyy')}` : 'Please select a date range'}</h5>
  </div>
  )
}
