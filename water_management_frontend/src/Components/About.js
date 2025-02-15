import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div style={{ position: "relative" }}>
        <img
          src="./assests/about.avif"
          alt="About us"
          className="img-fluid"
          style={{ height: "90vh", objectFit: "cover", width: "100%"}}
        />
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold",color:"black",marginTop:"1.2rem" }}>About Us</h1>
          <p style={{ fontSize: "1.2rem", marginTop: "25px", color:"black",fontWeight: "bold" }}>
          Our pure water is a testament to quality and reliability, carefully sourced and treated
           to meet the highest standards of purity. We understand the critical role water plays
            in daily life and are committed to ensuring a steady and safe supply for all our customers. 
            Whether it's for drinking, household use, or industrial purposes, our water undergoes 
            rigorous testing and treatment processes to guarantee its cleanliness and safety.
             As experts in water management, we take pride in delivering not just water, 
             but peace of mind, knowing that you and your community have access to the best
              quality water possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
