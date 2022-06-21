import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Photos/logo.png";

export const AdminLogin = () => {
  const [returnedData, setReturnedData] = useState([]);
  const { setAuthState } = useContext(AuthContext);
  const [adminLogin, setAdminLogin] = useState({
    Email: "",
    SignOnName: "",
    UserPassword: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setAdminLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const newLogin = async () => {
    try {
      const newData = await fetch("https://lssapi.herokuapp.com/user_login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...adminLogin,
        }),
      }).then((res) => res.json());

      //storing our accessToken to the local storage if there is no error
      if (newData.error) {
        console.log("errorrrrrrr");
      } else {
        localStorage.setItem("accessToken", newData);
        setAuthState(true);
        navigate.push("/admin");
        console.log("Ok");
      }

      console.log(newData);
      setReturnedData(newData);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newLogin();
  };
  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="logo" />
      <h1>Admin Panel Login</h1>
      <form className="login-form login-card">
        <div className="card_header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
            ></path>
          </svg>
          <h1 className="form_heading">Sign in</h1>
        </div>
        <div className="field">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            className="login-input"
            name="SignOnName"
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="login-input"
            name="UserPassword"
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <button className="btn-login" onClick={(e) => handleSubmit(e)}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
