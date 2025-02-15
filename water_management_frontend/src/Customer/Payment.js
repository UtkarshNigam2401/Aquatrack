import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Payment() {
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

  const { userId, amount, billId } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !cvv || !expiryDate) {
      toast.error("Please fill all payment details.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      await axios.post(
        `http://localhost:8080/customer/makePayment/${userId}?amount=${amount}&billId=${billId}`,
        {},
        config
      );

      toast.success("Payment successful!", {
        position: "top-center",
        autoClose: 500,
      });
      setTimeout(() => {
        navigate("/customer/paybill");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1c1c",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ToastContainer/>
      <div className="container my-5">
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: " #aeff00" }}
        >
          Payment Page
        </h2>

        <div
          className="card mx-auto"
          style={{
            maxWidth: "500px",
            padding: "20px",
            backgroundColor: "#333",
            color: " #aeff00",
          }}
        >
          <h4>Bill ID: {billId}</h4>
          <h4>Total Amount: ₹{amount}</h4>

          <div className="mb-3">
            <label
              htmlFor="cardNumber"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="form-control"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="cvv"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              className="form-control"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="expiryDate"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Expiry Date
            </label>
            <input
              type="month"
              id="expiryDate"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handlePayment}
            style={{
              fontWeight: "bold",
              backgroundColor: "#aeff00",
              color: "black",
            }}
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
