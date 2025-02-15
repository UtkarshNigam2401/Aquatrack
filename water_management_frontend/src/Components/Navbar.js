import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark px-3"
      style={{ minHeight: "80px"}}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand text-white d-flex align-items-center"
          to="/"
        >
          <span className="logo-style">AQUATRACK</span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 text-white fw-semibold"
                to="/about"
              >
                <button type="button" class="btn btn-outline-light">About</button>
               
              </NavLink>
            </li>
            {/* Sign Up and Login links */}
            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 text-white fw-semibold"
                to="/login"
              >
                <i className="bi bi-person-circle"></i> 
                <button type="button" class="btn btn-outline-light">Login</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 text-white fw-semibold"
                to="/register"
              >
                <i className="bi bi-person-plus-fill"></i> 
                <button type="button" class="btn btn-outline-light" style={{ backgroundColor: "#00b7ff9a",color:"white" }}>Register Here</button>
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
