import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customer from "./Customer";

function RaiseComplaint() {

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
    
  const [complaints, setComplaints] = useState([]);
  const id = sessionStorage.getItem("userId");

  const fetchComplaints = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:8080/customer/getUserComplaints/${id}`,
        config
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to fetch complaints.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const formik = useFormik({
    initialValues: {
      issue: "",
    },
    validationSchema: Yup.object({
      issue: Yup.string().required("Complaint issue is required"),
    }),
    onSubmit: async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      // Include userId in the values
      const payload = { ...values, id };

      try {
        await axios.post(
          "http://localhost:8080/customer/registerComplaint",
          payload,
          config
        );
        toast.success("Complaint raised successfully!", {
          position: "top-center",
          autoClose: 500,
        });

        setTimeout(() => {
          fetchComplaints();
          formik.resetForm();
        }, 2000);
      } catch (error) {
        console.error("Error raising complaint:", error);
        toast.error("Failed to raise complaint.");
      }
    },
  });

  return (
    <Customer>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Complaint Form */}
          <div className="form-section">
            <h3>Raise a Complaint</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Complaint Issue</label>
                <textarea
                  className="form-control"
                  placeholder="Describe your issue..."
                  {...formik.getFieldProps("issue")}
                ></textarea>
                {formik.touched.issue && formik.errors.issue && (
                  <div className="text-danger">{formik.errors.issue}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Complaint
              </button>
            </form>
          </div>

          {/* View Complaints Section */}
          <div className="view-section">
            <h2>View Complaints</h2>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Complaint ID</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(({ complaintId, issue, status }) => (
                  <tr key={complaintId}>
                    <td>{complaintId}</td>
                    <td>{issue}</td>
                    <td
                      style={{
                        color:
                          status === "PENDING"
                            ? "orange"
                            : status === "RESOLVED"
                            ? "green"
                            : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 95%;
          margin: 20px auto;
        }
        .content {
          display: flex;
          gap: 20px;
        }
        .form-section {
          flex: 1;
          background: #1e1c1c;
          color: white;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
        }
        .view-section {
          flex: 2;
        }
      `}</style>
    </Customer>
  );
}

export default RaiseComplaint;
