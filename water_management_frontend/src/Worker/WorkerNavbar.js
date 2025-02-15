import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Badge, Button } from "react-bootstrap";
import { FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css";
function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    const logoutChannel = new BroadcastChannel("logout-channel");
    logoutChannel.postMessage({ type: "logout" });

    toast.info("Signed Out Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    logoutChannel.close();
  };

  const logoutChannel = new BroadcastChannel("logout-channel");
  logoutChannel.addEventListener("message", (event) => {
    if (event.data.type === "logout") {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-5">
        <Container fluid>
          <Navbar.Brand
            as={NavLink}
            to="/worker"
            className="d-flex align-items-center text-decoration-none"
          >
            <span className="logo-style"> AQUAWORK</span>
          </Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex justify-content-between w-100">
              <Nav.Item>
                <NavLink></NavLink>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="light" className="fs-5 text-dark fw-semibold">
                  <FaUserCircle />
                  {sessionStorage.getItem("userName")}
                </Badge>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  );
}

export default AdminNavbar;
