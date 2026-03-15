/* UI note: This screen uses the shared dark bronze shell so individual mini-builds inherit consistent spacing, readable contrast, and mobile-friendly surfaces. */
import React, { useState, useEffect, useMemo } from "react";
import { faker } from "@faker-js/faker";
import css from "./filter-styles.module.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./compactGrid";
// import { columns } from "./columns";
import DownloadTableButton from "./DownloadTableButton";
import DatePicker from "../../DatePicker";
import StyledButton from "../../StyledButton";

export default function Filters() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterLogic, setFilterLogic] = useState({});

  useEffect(() => {
    const from = "2000-01-01";
    const to = "2023-12-31";

    // Build a consistent fake dataset once so the table and CSV export stay aligned.
    const createRandomUser = () => ({
      userId: faker.string.uuid(),
      fullName: faker.person.fullName(),
      username: faker.person.fullName(),
      prefix: faker.person.prefix(),
      email: faker.internet.email(),
      date: faker.date.between({ from, to }).toLocaleDateString(),
      color: faker.internet.color(),
      address: faker.person.jobTitle(),
      avatar: faker.image.avatar(),
    });

    setUsers(faker.helpers.multiple(createRandomUser, { count: 1000 }));
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(normalizedFilter) ||
        user.email.toLowerCase().includes(normalizedFilter) ||
        user.fullName.toLowerCase().includes(normalizedFilter) ||
        user.date.toLowerCase().includes(normalizedFilter) ||
        user.color.toLowerCase().includes(normalizedFilter) ||
        user.address.toLowerCase().includes(normalizedFilter) ||
        user.userId.toLowerCase().includes(normalizedFilter),
    );
  }, [filter, users]);

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  // Keep the parent table state in sync with the custom date picker.
  const getDates = (payload, shouldReset) => {
    if (payload?.date?.from?.length > 0 && payload?.date?.to?.length > 0) {
      setFilterLogic(payload);
      setOriginalData(users);
      setUsers(filterByDateUsers(users, payload.date.from, payload.date.to));

      if (shouldReset === true && typeof payload.reset === 'function') {
        payload.reset();
      }
    }
  };

  function filterByDateUsers(dataArray, fromDate, toDate) {
    return dataArray.filter((item) => {
      const itemDate = new Date(item.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return itemDate >= from && itemDate <= to;
    });
  }

  function resetFilters() {
    setUsers(originalData.length > 0 ? originalData : users);
    setFilter("");
    setOriginalData([]);

    if (typeof filterLogic.reset === 'function') {
      filterLogic.reset();
    }
  }

  return (
    <div className={css.user_list}>
      <div className={css.filtersHeader}>
        <div>
          <h3>Filter user data</h3>
          <p>Search, narrow by date, and export the active result set or only the selected rows.</p>
        </div>
        <DownloadTableButton
          type="secondary"
          text="Download current table"
          data={filteredUsers}
          filename="table.csv"
        />
      </div>

      <div className={css.search_input}>
        <input
          className={css.search}
          type="text"
          placeholder="Filter by name, email, date, colour, role, or id"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className={css.date_section}>
          <div className={css.filter_dates_header_inner}>
            <p>Filter by dates</p>
            <DatePicker getDates={getDates} />
          </div>
          {originalData.length > 0 ? (
            <StyledButton text="Reset filters" type="reddit" size="small" onPress={resetFilters} />
          ) : null}
        </div>
      </div>

      {selectedRows.length > 0 ? (
        <div className={css.selectedActions}>
          <span>{selectedRows.length} row(s) selected</span>
          <DownloadTableButton
            data={selectedRows}
            type="reddit"
            text="Download selected rows"
          />
        </div>
      ) : null}

      <div className={css.tableWrap}>
        <DataTable
          data={filteredUsers}
          expandableRows
          expandableRowsComponent={({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>}
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
          onSelectedRowsChange={handleRowSelected}
          onRowClicked={(row) => console.log(row)}
        />
      </div>
    </div>
  );
}
