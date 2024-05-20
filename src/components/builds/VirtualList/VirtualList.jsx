import React, { useMemo } from "react";
import { faker } from "@faker-js/faker";
import { Table, Checkbox } from "rsuite";
import 'rsuite/Table/styles/index.css'

function VirtualList() {

    const data = Array.from({ length: 100 }).map((v, i) => {
        return {
          id: `id_${i}`,
          name: faker.person.fullName(),
          email: faker.internet.email(),
    
        };
        });


  const { Column, HeaderCell, Cell } = Table;
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }


  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map(item => item.id) : [];
    //setCheckedKeys(keys);
    console.log('keys', keys)
  };
  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
    console.log('keys', keys)
    //setCheckedKeys(keys);
  };

  // Create 1,000 users using the useMemo hook
  const users = useMemo(() => {
    return Array.from({ length: 500 }, () => ({
      id: faker.string.sample(5),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }));
  }, []); // Empty dependency array means this will run only once


  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );



  return (
    <div style={{width: 'inherit'}}>
      <Table virtualized height={400} data={data}>
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: '40px' }}>
            <Checkbox
              inline
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleCheckAll}
            />
          </div>
        </HeaderCell>
        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
      </Column>
        <Column width={70} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={130}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={200}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
      </Table>
    </div>
  );
}

export default VirtualList;
