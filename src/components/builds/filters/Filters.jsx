import React, { useState, useEffect, useMemo } from "react";
import { faker } from "@faker-js/faker";
import css from "./filter-styles.module.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./compactGrid";
import { columns } from "./columns";
import DownloadTableButton from "./DownloadTableButton";

export default function Filters() {
  // State to store the list of users and the filter input value
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  // Generate fake users when the component mounts
  useEffect(() => {
    // Function to generate random user data
    const createRandomUser = () => {
      return {
        userId: faker.string.uuid(),
        fullName: faker.person.fullName(),
        username: faker.person.fullName(),
        prefix: faker.person.prefix(),
        email: faker.internet.email(),
        emoji: faker.internet.emoji(),
        color: faker.internet.color(),
        address: faker.person.jobTitle(),
        avatar: faker.image.avatar(),
        // Add more user details as needed
      };
    };

    // Generate 10 random users using faker library method
    const generatedUsers = faker.helpers.multiple(createRandomUser, {
      count: 50,
    });
    console.log("generatedUsers", generatedUsers);
    setUsers(generatedUsers);
  }, []);



  // A super simple expandable component.
  const ExpandedComponent = ({ users }) => (
    <pre>{JSON.stringify(users, null, 2)}</pre>
  );

  // Memoize the filtered users array to avoid unnecessary re-renders
  const filteredUsers = useMemo(() => {
    // Filter user by all properties
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        user.emoji.toLowerCase().includes(filter.toLowerCase()) ||
        user.color.toLowerCase().includes(filter.toLowerCase()) ||
        user.address.toLowerCase().includes(filter.toLowerCase()) ||
        user.userId.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, users]);



  return (
    <div className={css.user_list}>
      <input
        className={css.search}
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {users ? <DownloadTableButton data={users} filename="data.csv" /> : <p>Loading...</p>}
      {/*  Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        // expandableRows
        // expandableRowsComponent={ExpandedComponent}
        pagination
        paginationPerPage={20}
        dense
        title="Users"
        selectableRows
        highlightOnHover
        fixedHeader
        pointerOnHover
        customStyles={customStyles}
        selectableRowsHighlight
        onRowClicked={(row) => console.log(row)}
        // actions={actionsMemo}
      />
    </div>
  );
}
