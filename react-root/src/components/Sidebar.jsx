import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Projects</h3>
      <Link
        to="/angular"
        className={`sidebar-link ${location.pathname === "/angular" ? "active" : ""}`}
      >
        Angular Project
      </Link>
      <Link
        to="/vue"
        className={`sidebar-link ${location.pathname === "/vue" ? "active" : ""}`}
      >
        Vue Project
      </Link>
    </div>
  );
};

export default Sidebar;
