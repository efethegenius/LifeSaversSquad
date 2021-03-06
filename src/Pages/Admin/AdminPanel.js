import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import logo from "../../Photos/logo.png";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { COLUMNS } from "../Components/Columns";
import { GlobalFilter } from "../Components/GlobalFilter";
import { ColumnFilter } from "../Components/ColumnFilter";
import { Checkbox } from "../Components/Checkbox";

export const AdminPanel = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [returnedVolunteers, setReturnedVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [returnedData, setReturnedData] = useState([]);

  const getAllVolunteers = async () => {
    try {
      const allVolunteers = await fetch(
        "https://lssapi.herokuapp.com/full-volunteer",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      console.log(allVolunteers);
      setReturnedVolunteers(allVolunteers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllVolunteers();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const data = returnedVolunteers;
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  });

  const {
    getTableProps,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="panel-container">
      <div className="nav-container admin-nav">
        <h2>LifeSaversSquad</h2>
        <div
          className={isMenu ? "show-menu menu-container" : "menu-container"}
          onClick={() => setIsMenu(false)}
        >
          <Link to="/admin" className="links active">
            Trained
          </Link>
          <Link to="/untrained" className="links">
            UnTrained
          </Link>
          <Link to="/training" className="links">
            In-training
          </Link>
          <Link to="/" className="links">
            Home
          </Link>
          {/* </div> */}
        </div>
        {isMenu ? (
          <FaTimes className="ham-menu" onClick={() => setIsMenu(!isMenu)} />
        ) : (
          <HiMenuAlt1 className="ham-menu" onClick={() => setIsMenu(!isMenu)} />
        )}
      </div>
      <div className="full-list">
        <div className="table-header">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <div className="table-container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <pre>
            <code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map((row) => row.original),
                },
                null,
                2
              )}
            </code>
          </pre> */}
        </div>
        <div className="table-nav">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};
