import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {
  FaUserEdit,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import CustomerNavbar from "./CustomerNavbar";
import "./Styles.css";

function Customer({ children }) {

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
      <CustomerNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{
            border: "2px solid #00b7ff9a",
            display: "flex",
            width: "175px",
          }}
        >
          <div className="sidebar-header">
            <h3>Customer</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/customer/editcustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserEdit className="icon" /> Edit Profile
            </NavLink>

            <NavLink
              to="/customer/raisecomplaint"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <MdReportProblem className="icon" /> Raise Complaint
            </NavLink>

            <NavLink
              to="/customer/paybill"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaFileInvoiceDollar className="icon" /> Pay Bill
            </NavLink>

            <NavLink
              to="/customer/payments"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaMoneyBillWave className="icon" /> Payments
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Customer;
