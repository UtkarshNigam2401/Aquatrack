import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserPlus, FaUsers, FaTools, FaClipboardList, } from "react-icons/fa";
import WorkerNavbar from "./WorkerNavbar";
import { BiReceipt } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

function Worker({ children }) {
  const navigate = useNavigate();

        useEffect(() => {
          if (!sessionStorage.getItem("userName")) {
            navigate("/");
          } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
            navigate("/customer");
          } else if (sessionStorage.getItem("userRole") === "WORKER") {
            navigate("/worker");
          } else if (sessionStorage.getItem("userRole") === "ADMIN") {
            navigate("/admin");
          }
        }, [navigate]);

  return (
    <div>
      <WorkerNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{ border: "2px solid #00b7ff9a", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Worker</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/worker/addcustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserPlus className="icon" /> Add Customer
            </NavLink>
            <NavLink
              to="/worker/viewcustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUsers className="icon" /> View Customers
            </NavLink>
            <NavLink
              to="/worker/showbills"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <BiReceipt className="icon" /> Bills
            </NavLink>
            <NavLink
              to="/worker/viewcomplaints"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaClipboardList className="icon" /> View Complaints
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Worker;
