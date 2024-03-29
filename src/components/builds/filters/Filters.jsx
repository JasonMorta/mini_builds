import React, { useState, useEffect, useMemo } from "react";
import { faker } from "@faker-js/faker";
import css from "./filter-styles.module.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./compactGrid";
import { columns } from "./columns";
import DownloadTableButton from "./DownloadTableButton";
import DatePicker from "../../DatePicker";
import StyledButton from "../../StyledButton";

export default function Filters() {
  // State to store the list of users and the filter input value
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [restFilter, setRestFilter] = useState(false);
  const [filterLogic, setFilterLogic] = useState({});

  // Generate fake users when the component mounts
  useEffect(() => {
    const from = "2000-01-01";
    const to = "2023-12-31";
    // Function to generate random user data
    const createRandomUser = () => {
      return {
        userId: faker.string.uuid(),
        fullName: faker.person.fullName(),
        username: faker.person.fullName(),
        prefix: faker.person.prefix(),
        email: faker.internet.email(),
        date: faker.date.between({ from, to }).toLocaleDateString(),
        color: faker.internet.color(),
        address: faker.person.jobTitle(),
        avatar: faker.image.avatar(),
        // Add more user details as needed
      };
    };

    // Generate 10 random users using faker library method
    const generatedUsers = faker.helpers.multiple(createRandomUser, {
      count: 1000,
    });
    console.log("generatedUsers", generatedUsers);
    setUsers(generatedUsers);
  }, []);

  // Memoize the filtered users array to avoid unnecessary re-renders
  let filteredUsers = useMemo(() => {
    // Filter user by all properties
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        user.date.toLowerCase().includes(filter.toLowerCase()) ||
        user.color.toLowerCase().includes(filter.toLowerCase()) ||
        user.address.toLowerCase().includes(filter.toLowerCase()) ||
        user.userId.toLowerCase().includes(filter.toLowerCase())
    );
  },[filter, users]);

  // Display this button when a row is selected/checked
  const contextActions = React.useMemo(() => {

    return (
      <DownloadTableButton
        data={selectedRows}
        type="reddit"
        text="Download Selected Rows"
        //filename="table-rows.csv"
      />
    );
  }, [selectedRows]);

  function handleRowSelected(state) {
    console.log("state", state.selectedRows);
    setSelectedRows(state.selectedRows);
  }

  // Get the dates from the DatePickers
  const getDates = (props, shouldReset) => {
    console.log('props', props)
    if (props?.date?.from?.length > 0 && props?.date?.to?.length > 0) {
      setFilterLogic(props);
      setOriginalData(users);
      const filteredData = filterByDateUsers(users, props.date.from, props.date.to);
      setUsers(filteredData);


      if (shouldReset === true) {
        console.log('shouldReset', shouldReset)
       props.reset();
      }
    }

   // 
  };

  // Date filtering logic
  function filterByDateUsers(dataArray, fromDate, toDate) {
    return dataArray.filter((item) => {
      const itemDate = new Date(item.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return itemDate >= from && itemDate <= to;
    });
  }

  //clear all filters button
function resetFilters() {
  console.log('resetFilters')
  setUsers(originalData);
  setFilter("");
  setOriginalData([]);
  setRestFilter(true);

  // Call getDates with reset flag
  //filterLogic
  filterLogic.reset()
}

  return (
    <div className={css.user_list}>
      <h3>FIlter user data - Download table or individual rows</h3>

      {/* Search input */}
      <div className="search_input">
        <input
          className={css.search}
          type="text"
          placeholder="Filter key"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className={css.date_section}>
          <div className={css.filter_dates_header_inner}>
            <p style={{ margin: "20px 0 0 0" }}>Filter by dates</p>
            <DatePicker getDates={getDates} />
          </div>
          {originalData.length > 0 ? <StyledButton 
            text="Reset Filters" 
            type="reddit"
            size="small" 
            onPress={resetFilters} /> : <></>}
        </div>
      </div>

      {/* Download table button */}
      {filteredUsers ? (
        <DownloadTableButton
          type="secondary"
          text="Download Current Table"
          data={filteredUsers}
          filename="table.csv"
        />
      ) : (
        <p>Loading...</p>
      )}

      {/*  Table layout */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        expandableRows
        expandableRowsComponent={({ data }) => (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
        pagination
        paginationPerPage={15}
        dense
        title={`${filteredUsers.length} Fake Users`}
        selectableRows
        highlightOnHover
        fixedHeader
        pointerOnHover
        customStyles={customStyles}
        selectableRowsHighlight
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        onRowClicked={(row) => console.log(row)}
        // actions={actionsMemo}
      />
    </div>
  );
}
