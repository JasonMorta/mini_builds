import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Radios(props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Bootcamps</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="none"
        name="radio-buttons-group"
        onClick={props.handleBootcamps}
      >
        <FormControlLabel value="none" control={<Radio />} label="none" />
        <FormControlLabel value="Data Science Bootcamp" control={<Radio />} label="Data Science" />
        <FormControlLabel value="Software Engineer Bootcamp" control={<Radio />} label="Software Engineering" />
        <FormControlLabel value="Web Development Bootcamp" control={<Radio />} label="Web Development" />
        <FormControlLabel value="1 - Introduction to programming" control={<Radio />} label="Introduction to programming" />
      </RadioGroup>
    </FormControl>
  );
}