import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Customer from "./Customer";

function Payments() {
  const [payments, setPayments] = useState([]);
  const id=sessionStorage.getItem("userId");

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
    const fetchPayments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
        };
        const response = await axios.get(`http://localhost:8080/customer/getPaymentsByUserId/${id}`, config);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);
  

  return (
    <Customer>
    <div>
      <h2>Payment History</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Payment ID</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map(({ paymentId, paymentDate, status, amount }) => (
              <tr key={paymentId}>
                <td>{paymentId}</td>
                <td>{new Date(paymentDate).toLocaleDateString()}</td>
                <td>{amount}</td>
                <td>
                  <span
                    className={`status ${status === "DONE" ? "done-status" : ""}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No payments available</td>
            </tr>
          )}
        </tbody>
      </table>

      <style jsx>{`
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          text-align: center;
          padding: 8px;
        }
        .status {
          padding: 5px 10px;
          border-radius: 5px;
        }
        .done-status {
          color: white;
          font-weight: bold;
          background-color: green
        }
      `}</style>
    </div>
    </Customer>
  );
}

export default Payments;
