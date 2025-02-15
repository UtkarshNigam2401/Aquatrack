import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserFriends, FaTools, FaMapMarkerAlt, FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
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
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{ border: "2px solid #00b7ff9a", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/viewcustomers"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserFriends className="icon" /> Customer
            </NavLink>
            <NavLink
              to="/admin/viewworkers"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaTools className="icon" /> Workers
            </NavLink>
            <NavLink
              to="/admin/viewareas"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaMapMarkerAlt className="icon" /> Area
            </NavLink>

            <NavLink
              to="/admin/viewcomplaints"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaFileAlt className="icon" /> Complaints
            </NavLink>

            <NavLink
              to="/admin/viewpayment"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaMoneyBillWave className="icon" /> Payment
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Admin;
