import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Worker from "./Worker";

function ShowBills() {
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
  const [bills, setBills] = useState([]);
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/worker/getBillsForWorker/${id}`,
          config
        );
        setBills(response.data); // Save the bills data from API
      } catch (error) {
        console.error("Error fetching Bills:", error);
        toast.error("Failed to fetch Bill details.");
      }
    };
    fetchBills();
  }, []);

  return (
    <Worker>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="view-section">
            <div className="view-header">
              <h2>View Bill Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  <th>Billing Date</th>
                  <th>Due Date</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map(
                    ({
                      billId,
                      user,
                      amount,
                      billingDate,
                      dueDate, // Correct field name here
                      paymentStatus,
                    }) => (
                      <tr key={billId}>
                        <td>{billId}</td>
                        <td>{user.name}</td>
                        <td>{amount}</td>
                        <td>{billingDate}</td>
                        <td>{dueDate}</td>
                        <td>
                          <span
                            className={`status ${
                              paymentStatus === "Paid"
                                ? "paid-status"
                                : "pending-status"
                            }`}
                          >
                            {paymentStatus === "Paid" ? "Paid" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">No bill data available</td>
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
        .paid-status {
          background-color: #28a745;
          color: white;
        }
        .pending-status {
          background-color: #ff9800;
          color: white;
        }
      `}</style>
    </Worker>
  );
}

export default ShowBills;
