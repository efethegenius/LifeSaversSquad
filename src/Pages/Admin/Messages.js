import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import logo from "../../Photos/logo.png";

export const Messages = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [returnedMessages, setReturnedMessages] = useState([]);

  const getAllMessages = async () => {
    try {
      const allMessages = await fetch("/full-messages", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedMessages(allMessages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <div className="msg-wrapper">
      <div className="nav-container admin-nav">
        <img src={logo} alt="logo" className="logo" />
        <div
          className={isMenu ? "show-menu menu-container" : "menu-container"}
          onClick={() => setIsMenu(false)}
        >
          <img src={logo} alt="logo" className="logo" />
          <div className="menu-links">
            <Link to="/admin" className="links">
              Volunteers
            </Link>

            <Link to="/messages" className="links">
              Messages
            </Link>
          </div>
        </div>
        {isMenu ? (
          <FaTimes className="ham-menu" onClick={() => setIsMenu(!isMenu)} />
        ) : (
          <HiMenuAlt1 className="ham-menu" onClick={() => setIsMenu(!isMenu)} />
        )}
      </div>
      <h2 className="msg-head">MESSAGES</h2>
      <div className="all-msgs">
        {returnedMessages.name &&
          returnedMessages.name.map((message) => {
            const { id, createdAt, Name, Email, Message } = message;
            const newDate = `${new Date(createdAt).toLocaleDateString()}`;
            return (
              <div key={id} className="msg-card">
                <p className="msg-strong">{newDate}</p>
                <p className="msg-text">{Message}</p>
                <a href={`mailto:${Email}`} className="msg-strong">
                  {Email}
                </a>
                <p className="msg-strong">{Name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
