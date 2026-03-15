/* UI note: This screen uses the shared dark bronze shell so individual mini-builds inherit consistent spacing, readable contrast, and mobile-friendly surfaces. */
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Checkbox, Loader } from 'rsuite';
import 'rsuite/Table/styles/index.css';

function VirtualList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    worker.onmessage = (event) => {
      setData(event.data);
      setLoading(false);
    };
    worker.postMessage('generate');
    return () => worker.terminate();
  }, []);

  const memoData = useMemo(() => data, [data]);

  const { Column, HeaderCell, Cell } = Table;
  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === memoData.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < memoData.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? memoData.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  return (
    <div className="virtual-list-build">
      <section className="virtual-list-build__intro build-card">
        <h4>Loads {memoData.length} users with the virtualized table component</h4>
        <p>
          Virtualization only renders the visible rows, which makes it a good choice for large datasets.
        </p>
        <p>
          In this example, a <b>Web Worker</b> generates the data off the main thread so the UI stays responsive.
        </p>
      </section>
      <section className="virtual-list-build__table build-card" style={{ minHeight: loading ? '320px' : '0' }}>
        {loading ? (
          <Loader size="md" center content="Loading..." />
        ) : (
          <Table virtualized autoHeight bordered cellBordered height={600} data={memoData}>
            <Column width={50} align="center">
              <HeaderCell style={{ padding: 0 }}>
                <div style={{ lineHeight: '40px' }}>
                  <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
                </div>
              </HeaderCell>
              <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
            </Column>
            <Column width={70} align="flex-start" fixed>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={230} align="flex-start">
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>
            <Column width={500} align="flex-start">
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
          </Table>
        )}
      </section>
    </div>
  );
}

export default VirtualList;
