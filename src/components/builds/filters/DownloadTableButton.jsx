import React from "react";
import StyledButton from "../../StyledButton";
import styles from './DownloadTableButton.module.css';

function arrayToCSV(data) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);
  let csv = `${headers.join(',')}\n`;

  data.forEach((obj) => {
    const values = headers.map((header) => {
      let value = obj[header];
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`;
      }
      return value;
    });
    csv += `${values.join(',')}\n`;
  });

  return new Blob([csv], { type: 'text/csv' });
}

function downloadCSV(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

export default function DownloadTableButton(props) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
    return null;
  }

  const handleDownload = () => {
    setButtonDisabled(true);
    const csvBlob = arrayToCSV(props.data);

    if (csvBlob) {
      const filename = props.filename || `table-rows-${props.data.length}.csv`;
      downloadCSV(csvBlob, filename);
      setTimeout(() => setButtonDisabled(false), 1000);
    }
  };

  return (
    <StyledButton
      text={props.text}
      data={props.data}
      type={props.type}
      disabled={buttonDisabled}
      className={styles.downloadTableButton}
      onPress={handleDownload}
    />
  );
}
