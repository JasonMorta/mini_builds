import React, { useState, useEffect, useMemo } from "react";
import { Table, Checkbox, Loader } from "rsuite";
import "rsuite/Table/styles/index.css";

function VirtualList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const worker = new Worker(new URL("./worker.js", import.meta.url));
    worker.onmessage = (event) => {
      setData(event.data);
      setLoading(false);
    };
    worker.postMessage("generate");
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
    console.log("keys", keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    console.log("keys", keys);
    setCheckedKeys(keys);
  };

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  const styles = {
    width: "auto",
    border: "1px solid gray",
    margin: "0px 60px",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
    borderRadius: "5px",
    borderBottom: "4px solid",
  };

  return (
    <div style={{ width: "inherit" }}>
      <section
        style={{
          width: "80%",
          margin: "auto",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        <h4>
          Loads {memoData.length} users with the Virtualized Table component
        </h4>
        <p>
          Virtualization will only render the visible rows, which makes it a
          good choice for large datasets.🎊
        </p>
        <p>
          However, when making a request to the server, the entire dataset is
          still loaded into memory and can cause the browser to hang/freeze if the data is very large.
          This is because the browser is single-threaded and the main thread is
          blocked by the request.
        </p>
        <p>
          In this example, we use a <b>Web Worker</b> to generate the data in a
          separate thread. This way, the main thread is not blocked and the
          browser remains responsive.
        </p>
      </section>
      {loading ? (
        <Loader center content="Loading..." />
      ) : (
        <Table virtualized style={styles} height={600} data={memoData}>
          <Column width={50} align="center">
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: "40px" }}>
                <Checkbox
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </HeaderCell>
            <CheckCell
              dataKey="id"
              checkedKeys={checkedKeys}
              onChange={handleCheck}
            />
          </Column>
          <Column width={70} align="flex-start" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={230} align={"flex-start"}>
            <HeaderCell>First Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={500} align={"flex-start"}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>
        </Table>
      )}
      <a
        href="https://rsuitejs.com/components/table/#virtualized"
        target="_blank"
        rel="noreferrer"
      >
        By rsuite
      </a>
    </div>
  );
}

export default VirtualList;
