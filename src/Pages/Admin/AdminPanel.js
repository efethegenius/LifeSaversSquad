import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import logo from "../../Photos/logo.png";

export const AdminPanel = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [returnedVolunteers, setReturnedVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [volunteers, setVolunteers] = useState(
    returnedVolunteers && returnedVolunteers
  );

  const filtered =
    returnedVolunteers.name && search
      ? returnedVolunteers.name.filter(
          (volunteer) =>
            volunteer.FirstName.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.LastName.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.City.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.Street.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.Zip.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.DateRegistered.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            volunteer.Previously_Volunteered_Here.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            volunteer.State.toLowerCase().includes(search.toLowerCase()) ||
            volunteer.Contact_Time.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            volunteer.Hear_About_Us.toLowerCase().includes(
              search.toLowerCase()
            ) ||
            volunteer.Available_Days.toLowerCase().includes(
              search.toLowerCase()
            )
        )
      : returnedVolunteers.name;

  const getAllVolunteers = async () => {
    try {
      const allVolunteers = await fetch("/full-volunteer", {
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
  }, []);
  return (
    <div className="panel-container">
      <div className="nav-container admin-nav">
        <img src={logo} alt="logo" className="logo" />
        <div
          className={isMenu ? "show-menu menu-container" : "menu-container"}
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} alt="logo" className="logo" />
          {/* <div className="menu-links"> */}
          <Link to="/admin" className="links">
            Volunteers
          </Link>

          <Link to="/messages" className="links">
            Messages
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
        <div className="vol-header">
          {/* <h2>ALL VOLUNTEERS</h2> */}
          <div className="search-group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              placeholder="Search for Name, State, City, Available Days..."
              type="text"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-container">
          <table id="customers">
            <tbody className="table-head">
              <tr>
                <th>Date Joined</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>State</th>
                <th>City</th>
                <th>Street</th>
                <th>Zip</th>
                <th>Best Contact Time</th>
                <th>Previously Volunteered?</th>
                <th>Heard About Us</th>
                <th>Available Days</th>
                <th>Additional Comments</th>
              </tr>
            </tbody>
            {returnedVolunteers.name &&
              filtered.map((volunteer) => {
                const {
                  id,
                  createdAt,
                  FirstName,
                  LastName,
                  Email,
                  PhoneNumber,
                  Contact_Time,
                  State,
                  City,
                  Street,
                  Zip,
                  Previously_Volunteered_Here,
                  Hear_About_Us,
                  Available_Days,
                  Additional_Comments,
                } = volunteer;
                const newDate = `${new Date(createdAt).toLocaleDateString()}`;
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{newDate}</td>
                      <td>{FirstName}</td>
                      <td>{LastName}</td>
                      <td>{Email}</td>
                      <td>{PhoneNumber}</td>
                      <td>{State}</td>
                      <td>{City}</td>
                      <td>{Street}</td>
                      <td>{Zip}</td>
                      <td>{Contact_Time}</td>
                      <td>{Previously_Volunteered_Here}</td>
                      <td>{Hear_About_Us}</td>
                      <td>{Available_Days}</td>
                      <td>{Additional_Comments}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};
