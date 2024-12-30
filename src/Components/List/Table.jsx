import React, { useState, useEffect } from "react";
import { flexRender } from "@tanstack/react-table";
import previouseImg from "../../assets/images/previouse.svg";
import doublePreviouseImg from "../../assets/images/doublePreviouse.svg";
import nextImg from "../../assets/images/next.svg";
import doubleNextImg from "../../assets/images/doubleNext.svg";

import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const Table = ({ columns, data }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
      globalFilter,
    },
  });

  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  return (
    <>
      <div className="flex justify-end pb-8">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(value)}
          className="p-2 font-lg border rounded border-block bg-gray-50 hover:bg-gray-200"
          placeholder="Search here..."
        />
      </div>
      <div className="overflow-auto mb-8">
        <table className="table-auto w-full bg-gray-50 shadow-lg p-8 rounded-lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-start p-4 text-nowrap last:min-w-40"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " ▲ ",
                          desc: " ▼ ",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
          <span className="flex items-center gap-2">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-2">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border rounded p-1 disabled:opacity-50 w-16 text-center"
            />
          </span>
          <select
            className="border rounded p-1 hover:bg-gray-200 disabled:opacity-50"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-2 rounded-md flex items-center disabled:bg-gray-700 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="First Page"
          >
            <img src={doublePreviouseImg} alt="First Page" />
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-2 rounded-md flex items-center disabled:bg-gray-700 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous Page"
          >
            <img src={previouseImg} alt="Previous Page" />
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-2 rounded-md flex items-center disabled:bg-gray-700 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next Page"
          >
            <img src={nextImg} alt="Next Page" />
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold p-2 rounded-md flex items-center disabled:bg-gray-700 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Last Page"
          >
            <img src={doubleNextImg} alt="Last Page" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
