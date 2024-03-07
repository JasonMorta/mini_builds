import React, { useState,useEffect } from 'react';
import css from './date-picker.module.css';
function DatePicker({ getDates, reset }) {
  
    const [selectedDates, setSelectedDates] = useState({ from: '', to: '' });
    const [resetDates, setResetDates] = useState(false);
    const [updateReset, setUpdateReset] = useState(false);

    function resetDate() {
        console.log('resetDate🚩')
        setResetDates(true);
        setUpdateReset(prev => !prev)
    
    }

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        setSelectedDates(prev => ({ ...prev, from: selectedStartDate }));
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        setSelectedDates(prev => ({ ...prev, to: selectedEndDate }));
    };

    
    // Get the dates from the DatePickers on change
    useEffect(() => {
        // call this function to when the dates are selected. It passes the dates and reset function to the parent component
        getDates({date: selectedDates, reset: resetDate});
      
    }, [selectedDates]);

    useEffect(() => {
        // call this function to when the dates are selected. It passes the dates and reset function to the parent component
       // getDates({date: selectedDates, reset: resetDate});
        setSelectedDates({ from: '', to: '' });
        setResetDates(false);

    }, [updateReset]);

    return (
        <div className={css.date_picker_outer}>
            <div className={css.date_container}>
                <label htmlFor="start-datepicker">From:</label>
                <input type="date" id="start-datepicker" value={selectedDates.from} onChange={handleStartDateChange} />
            </div>
            <div className={css.date_container}>
                <label htmlFor="end-datepicker">To:</label>
                <input type="date" id="end-datepicker" value={selectedDates.to} onChange={handleEndDateChange} />
            </div>
        </div>
    );
}

export default DatePicker;
