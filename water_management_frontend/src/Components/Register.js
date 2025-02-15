import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  // Fetch area data from API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customer/getAllAreas");
        setAreas(response.data);
      } catch (error) {
        toast.error("Failed to load areas", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    };
    fetchAreas();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      areaId: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
      areaId: Yup.string().required("Area is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://localhost:8080/customer/createUser`,
          {
            name: values.name,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address,
            password: values.password,
          },
          {
            params: { areaId: values.areaId },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        toast.error("Something went wrong!", {
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
      <div className="d-flex justify-content-center align-items-center vh-80 mt-4">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            backgroundColor: "#2b2828",
            border: "1px solid white",
            color: "white",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #b5dceb",
          }}
        >
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            {/* Mobile Input */}
            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("phoneNumber")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-danger">{formik.errors.phoneNumber}</div>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Address Input */}
            <div className="mb-3">
              <label>Address:</label>
              <input
                type="text"
                {...formik.getFieldProps("address")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            {/* Area Dropdown */}
            <div className="mb-3">
              <label>Area:</label>
              <select
                {...formik.getFieldProps("areaId")}
                className="form-control"
                style={{ height: "35px" }}
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area.areaId} value={area.areaId}>
                    {area.areaName}
                  </option>
                ))}
              </select>
              {formik.touched.areaId && formik.errors.areaId && (
                <div className="text-danger">{formik.errors.areaId}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#b5dceb" }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
