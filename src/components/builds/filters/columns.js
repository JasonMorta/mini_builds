export const columns = [
    {
      name: "Avatar",
      selector: (row) => <img width={30} src={row.avatar} alt="avatar" />,
      sortable: true,
      width: "80px",
      //conditional cell styling
    },
    {
      name: "Full name",
      selector: (row) => row.fullName,
      sortable: true,
      width: "160px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      width: "160px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "210px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      width: "115px",
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
      width: "90px",
      //conditional cell styling
      //when: (row) => row.color === "#4b7018",
      style: row => ({ backgroundColor: row.color }),
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      width: "200px",
    },
    {
      name: "ID",
      selector: (row) => row.userId,
      width: "60px",
      sortable: true,
    },
  ];