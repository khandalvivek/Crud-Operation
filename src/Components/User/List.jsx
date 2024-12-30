import React, { useState, useEffect } from "react";
import ListHeader from "../List/ListHeader";
import Table from "../List/Table";
import ActionButtons from "../List/ActionButtons";

import {
  createColumnHelper,
  RowPagination,
} from "@tanstack/react-table";

export const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("users")) || [];
    setData(savedData);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      const savedData = JSON.parse(localStorage.getItem("users")) || [];
      console.log('savedData: ', savedData);
      const updatedData = savedData.filter((user) => user.id != id);
      localStorage.setItem("users", JSON.stringify(updatedData));
      setData(updatedData);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      header: "No",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    columnHelper.accessor("name", {
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      cell: ({ row }) => {
        const email = row.original.email;
        return <a href={`mailto:${email}`}>{email}</a>;
      },
    }),
    columnHelper.accessor("mobile", {
      header: () => <span>Mobile No.</span>,
      cell: ({ row }) => {
        const mobile = row.original.mobile;
        return <a href={`tel:${mobile}`}>{mobile}</a>;
      },
    }),
    columnHelper.accessor("dob", {
      header: () => <span>Date Of Birth</span>,
    }),
    columnHelper.accessor("country", {
      header: () => <span>Country</span>,
    }),
    columnHelper.accessor("state", {
      header: () => <span>State</span>,
    }),
    columnHelper.accessor("city", {
      header: () => <span>City</span>,
    }),
    columnHelper.group({
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return <ActionButtons entityType="user" entity={user} handleDelete={handleDelete} />;
      },
    }),
  ];


  return (
    <>
      <div className="p-8">
        <ListHeader
          title="List Of User Data"
          link="/user/create"
          isListPage={true}
        />
        <Table columns={columns} data={data} />
      </div>
    </>
  );
};

export default List;
