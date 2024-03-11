import React from "react";
import StyledButton from "../../StyledButton";
import './buttonCss.css';

// Build the CSV table headers and rows from the data
function arrayToCSV(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    data.forEach(obj => {
        const values = headers.map(header => {
            let value = obj[header];
            if (typeof value === 'string' && value.includes(',')) {
                value = `"${value}"`;
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });

    return new Blob([csv], { type: 'text/csv' });
}

// Create a CSV file and download it
function downloadCSV(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Button requires a arrays of objects and ?filename
 function DownloadTableButton(props) {

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
        return <></>
    } else {
        const handleDownload = () => {
            setButtonDisabled(true);
            const csvBlob = arrayToCSV(props.data);
            if (csvBlob) {
                downloadCSV(csvBlob, `table-rows-${props.data.length}`);// if no filename is provided, default to 'table.csv'
                setTimeout(() => setButtonDisabled(false), 1000);
            }
        };

        return (
            <StyledButton 
            text={props.text}
            data={props.data}
            //filename={props.filename}
            type={props.type}
            disabled={buttonDisabled}
            className="download_table_button"
            onPress={handleDownload}/>
        );
    }
}

export default DownloadTableButton;
