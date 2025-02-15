import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

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

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/admin/getAllComplaints`,
          config
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to fetch complaints.");
      }
    };
    fetchComplaints();
  }, []);

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="view-section">
            <div className="view-header">
              <h2>View Complaints</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Complaint ID</th>
                  <th>User Name</th>
                  <th>Area Name</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map(
                    ({
                      complaintId,
                      user: { name },
                      area: { areaName },
                      issue,
                      status,
                    }) => (
                      <tr key={complaintId}>
                        <td>{complaintId}</td>
                        <td>{name}</td>
                        <td>{areaName}</td>
                        <td>{issue}</td>
                        <td>
                          <span
                            className={`status ${
                              status === "PENDING"
                                ? "pending-status"
                                : "resolved-status"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="5">No complaints available</td>
                  </tr>
                )}
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
        .view-section {
          flex: 3;
        }
        .view-header {
          margin-bottom: 15px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          text-align: center;
          padding: 8px;
        }
        .status {
          padding: 5px 10px;
          border-radius: 5px;
          font-weight: bold;
        }
        .pending-status {
          background-color: #ff9800;
          color: white;
        }
        .resolved-status {
          background-color: #28a745;
          color: white;
        }
      `}</style>
    </Admin>
  );
}

export default ViewComplaints;
