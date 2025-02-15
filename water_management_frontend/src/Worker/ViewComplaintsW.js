import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Worker from "./Worker";

function ViewComplaintsW() {
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

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/worker/getComplaintsrByWorkerId/${id}`,
          config
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        toast.error("Failed to fetch complaints.");
      }
    };
    fetchComplaints();
  }, [id]);

  const handleChangeStatus = async (complaintId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      // Sending the status as a query parameter
      await axios.put(
        `http://localhost:8080/worker/updateComplaintStatus/${id}/${complaintId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          params: {
            status: "RESOLVED",
          },
        }
      );
      toast.success("Complaint status updated successfully!", {
        autoClose: 1500,
        onClose: () => window.location.reload(), // Reload page after toast completes
      });      
      
    } catch (error) {
      console.error(
        "Error updating complaint status:",
        error.response || error
      );
      toast.error("Failed to update status.");
    }
  };

  return (
    <Worker>
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
                  <th>Action</th>
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
                        <td>
                          {status === "PENDING" && (
                            <button
                              className="status-btn"
                              onClick={() => handleChangeStatus(complaintId)}
                            >
                              Change Status
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">No complaints available</td>
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
        .status-btn {
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .status-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </Worker>
  );
}

export default ViewComplaintsW;
