import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GenerateBill() {
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

  const location = useLocation();
  const { customerId, registrationDate } = location.state || {};

  const [startDate, setStartDate] = useState(registrationDate);
  const [endDate, setEndDate] = useState("");
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const daysDifference = calculateDaysBetweenDates(startDate, endDate);
      if (daysDifference >= 0) {
        setTotalBill(daysDifference * 5); // Assuming ₹5 per day
      } else {
        setTotalBill(0);
      }
    }
  }, [startDate, endDate]);

  const calculateDaysBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInTime = endDate - startDate;
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmitBill = async () => {
    if (!startDate || !endDate || totalBill <= 0) {
      toast.error("Please provide valid dates and ensure the bill is greater than zero.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      // Sending the billData in the body of the POST request
      await axios.post(`http://localhost:8080/worker/generateBill/${customerId}?amount=${totalBill}`, {}, config);

      toast.success("Bill Generated successfully!");
              setTimeout(() => {
                navigate("/worker/showbills");
              }, 1500);
    } catch (error) {
      console.error("Error generating the bill:", error);
      toast.error("Failed to generate the bill. Please try again.");
    }
  };

  return (
    <div className="generate-bill-container">
      <ToastContainer />
      <h2>Generate Bill</h2>
      <div className="form-group">
        <label>Payment Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Payment End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="bill-summary">
        <p>
          <strong>Total Bill:</strong> ₹{totalBill}
        </p>
      </div>
      <button className="submit-bill-btn" onClick={handleSubmitBill}>
        Submit Bill
      </button>

      <style jsx>{`
        .generate-bill-container {
          max-width: 600px;
          margin: 40px auto;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          color: #333;
        }
        .form-group {
          margin: 20px 0;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }
        input[type="date"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }
        .bill-summary {
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
        }
        .submit-bill-btn {
          display: block;
          width: 100%;
          background-color: #007bff;
          color: white;
          padding: 12px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
        .submit-bill-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default GenerateBill;
