import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Customer from './Customer';

function PayBill() {
  const { billId } = useParams(); // Access the billId from the URL
  const [billDetails, setBillDetails] = useState([]);
  const navigate = useNavigate();
 const id =  sessionStorage.getItem("userId");

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
        const fetchBillDetails = async () => {
          try {
            const config = {
              headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
            };
            const response = await axios.get(`http://localhost:8080/customer/getBillsForCustomer/${id}`, config);
            setBillDetails(response.data);
          } catch (error) {
            console.error("Error fetching Bill details:", error);
          }
        };
        fetchBillDetails();
      }, [billId]);
      

  const handlePayBill = (billId, userId, amount) => {
    navigate(`/customer/makepayment`, { state: { userId, amount, billId } }); // Pass data to payment page
  };
  

  return (
    <Customer>
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
                  <th>Amount</th>
                  <th>Billing Date</th>
                  <th>Due Date</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {billDetails.length > 0 ? (
                  billDetails.map(
                    ({
                      billId,
                      amount,
                      billingDate,
                      dueDate,
                      paymentStatus,
                    }) => (
                      <tr key={billId}>
                        <td>{billId}</td>
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
                        <td>
                          {paymentStatus === "PENDING" && (
                            <button
                              className="pay-button"
                              onClick={() => handlePayBill(billId, id, amount)}
                            >
                              Pay Bill
                            </button>
                          )}
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
        .pay-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 5px;
        }
        .pay-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </Customer>
  );
}

export default PayBill;
