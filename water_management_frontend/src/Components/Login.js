import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8080/signin", values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });
        const user1 = response.data;

        console.log(user1.authenticatedDetails.principal.id);
        sessionStorage.setItem("userName", user1.authenticatedDetails.principal.name);
        sessionStorage.setItem("userId", user1.authenticatedDetails.principal.id);
        sessionStorage.setItem("userRole", user1.authenticatedDetails.principal.role);
        sessionStorage.setItem("jwtToken", user1.jwt);
  
        console.log(sessionStorage.getItem("jwtToken"));
        if (user1.authenticatedDetails.principal.role === "ROLE_CUSTOMER") navigate("/customer");
        else if (user1.authenticatedDetails.principal.role === "ROLE_ADMIN") navigate("/admin");
        else if (user1.authenticatedDetails.principal.role === "ROLE_WORKER") navigate("/worker");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });


  return (
    <div
      style={{ backgroundColor: "#1e1c1c", color: "white", minHeight: "100vh" }}
    >
      <Navbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow-lg p-4"
          style={{
            width: "30rem",
            backgroundColor: "#2b2828",
            border: "1px solid white",
            color: "white",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #b5dceb",
          }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
               
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
               
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100 mt-3"
                style={{ backgroundColor: "#b5dceb" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
