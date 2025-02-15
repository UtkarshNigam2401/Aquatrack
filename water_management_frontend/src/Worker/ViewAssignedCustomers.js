import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Worker from "./Worker";

function ViewAssignedCustomers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const id = sessionStorage.getItem("userId");

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
    const fetchCustomers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/worker/getUsersForWorker/${id}`,
          config
        );
        setCustomers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customer details.");
        setCustomers([]); // Ensure customers remains an array
      }
    };
    fetchCustomers();
  }, []);
  

  const handleGenerateBill = (customerId, registrationDate) => {
    navigate(`/worker/generatebill`, { state: { customerId, registrationDate } });
  };

  return (
    <Worker>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="view-section">
            <div className="view-header">
              <h2>View Customer Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Registration Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map(
                    ({ id, name, email, address, phoneNumber, registrationDate }) => (
                      <tr key={id}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{address}</td>
                        <td>{phoneNumber}</td>
                        <td>{registrationDate}</td>
                        <td>
                          <button
                            className="generate-bill-btn"
                            onClick={() => handleGenerateBill(id, registrationDate)}
                          >
                            Generate Bill
                          </button>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="7">No customer data available</td>
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
        .generate-bill-btn {
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        .generate-bill-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </Worker>
  );
}

export default ViewAssignedCustomers;
