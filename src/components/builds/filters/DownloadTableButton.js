// A button that downloads the table data as a CSV file.
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

 function DownloadTableButton({ data, filename }) {
    console.log('data', data)
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <></>
    } else {
        const handleDownload = () => {
            const csvBlob = arrayToCSV(data);
            if (csvBlob) {
                downloadCSV(csvBlob, filename || 'data.csv');
            }
        };

        return (
            <button onClick={handleDownload}>Download Table</button>
        );
    }
}

export default DownloadTableButton;
