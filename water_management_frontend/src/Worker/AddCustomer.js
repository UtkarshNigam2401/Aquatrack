import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Worker from "./Worker";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function AddCustomer() {
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

  const [areas, setAreas] = useState([]);

  // Fetch area data from API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
        };
        const response = await axios.get("http://localhost:8080/worker/getAllAreas", config);
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
        const config = {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
        };
        const response = await axios.post(`http://localhost:8080/worker/createUser`,
          {
            name: values.name,
            phoneNumber: values.phoneNumber,
            email: values.email,
            address: values.address,
            password: values.password,
          },
          {
            params: { areaId: values.areaId },
            ...config,
          });
          toast.success("Customer Added Successfully!", {
            position: "top-center",
            autoClose: 1000,
          });
          formik.resetForm(); 
      } catch (error) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }    
  });

  return (
    <Worker>
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
          <h2 className="text-center mb-4">Add Customer</h2>
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
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Worker>
  );
}

export default AddCustomer;
