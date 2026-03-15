/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import styles from './url.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radios from './Radios';

export default function SetUrl() {
  const [newUrl, setNewUrl] = useState("");
  const [selectBC, setSelectBC] = useState("BoostCamps");

  function handleClick() {
    console.log(newUrl);
  }

  function handleBootcamps(e) {
    setSelectBC(e.target.value);
  }

  return (
    <div className={styles.container}>
      <p>Opens student dropbox folder</p>
      <Box sx={{ '&>:not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
        {/* Keep the MUI field dark so it matches the shared theme instead of rendering a pale default surface. */}
        <TextField
          id="filled-basic"
          label="Student Number"
          variant="filled"
          defaultValue={newUrl}
          onInput={(e) => setNewUrl(e.target.value)}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(34, 25, 18, 0.96)',
              borderRadius: '3px',
              color: '#f6efe6',
              '&:hover': { backgroundColor: 'rgba(42, 31, 23, 0.98)' },
              '&.Mui-focused': { backgroundColor: 'rgba(42, 31, 23, 0.98)' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(246, 239, 230, 0.72)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#d4a45e' },
          }}
        />
      </Box>
      <Radios handleBootcamps={handleBootcamps} />
      <a href={`https://www.dropbox.com/work/HyperionDev%20Reviewers/${newUrl}/${selectBC === "none" ? "" : selectBC}`} target="_blank">
        <button className={`${styles.button} ${styles.button5}`} onClick={handleClick}>Open folder</button>
      </a>
    </div>
  );
}
