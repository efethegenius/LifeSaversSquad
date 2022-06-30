import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import logo from "../../Photos/logo.png";
import { Fade } from "react-awesome-reveal";
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

export const InTraining = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [returnedVolunteers, setReturnedVolunteers] = useState([]);
  const [returnedData, setReturnedData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isApply, setIsApply] = useState(false);

  const getAllVolunteers = async () => {
    try {
      const allVolunteers = await fetch("/training-volunteer", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      console.log(allVolunteers);
      setReturnedVolunteers(allVolunteers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllVolunteers();
  }, [isApply]);

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

  const updateTrainee = async () => {
    const newData = await fetch(
      "https://lssapi.herokuapp.com/create/update_trainee",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...{
            selectedFlatRows: selectedFlatRows.map((row) => row.original),
          },
        }),
      }
    ).then((res) => res.json());
    setIsApply(!isApply);
    setReturnedData(newData[0]);
  };

  const handleError = () => {
    setIsError(true);
    setTimeout(function () {
      setIsError(false);
    }, 4000);
  };

  const handleSubmit = () => {
    selectedFlatRows.length < 1 ? handleError() : updateTrainee();
  };

  return (
    <div className="panel-container">
      <div className={isApply ? "apply-bg show-apply-bg" : "apply-bg"}>
        <Fade>
          <div className="apply-alert">
            <h1>Volunteer successfully added to Trained list!</h1>
            <button className="button" onClick={() => setIsApply(false)}>
              OK
            </button>
          </div>
        </Fade>
      </div>
      <div className="nav-container admin-nav">
        <h2>LifeSaversSquad</h2>
        <div
          className={isMenu ? "show-menu menu-container" : "menu-container"}
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} alt="logo" className="logo" />
          <Link to="/admin" className="links">
            Trained
          </Link>
          <Link to="/untrained" className="links">
            UnTrained
          </Link>
          <Link to="/training" className="links active">
            In-training
          </Link>
          <Link to="/" className="links">
            Home
          </Link>
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
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Certify as trained
          </button>
        </div>
        {isError && <p className="err">Please select at least one trainee</p>}
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
