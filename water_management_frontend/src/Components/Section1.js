import React from "react";

function Section1() {
  return (
    <div className="mycontainer my-5">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1">AQUATRACK</h2>
          <p className="mb-4 me-5 fs-5">
          Our pure water is a testament to quality and reliability, carefully sourced and treated
           to meet the highest standards of purity. We understand the critical role water plays
            in daily life and are committed to ensuring a steady and safe supply for all our customers. 
            Whether it's for drinking, household use, or industrial purposes, our water undergoes 
            rigorous testing and treatment processes to guarantee its cleanliness and safety.
             As experts in water supply management, we take pride in delivering not just water, 
             but peace of mind, knowing that you and your community have access to the best
              quality water possible.
          </p>
          
        </div>

        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/waterpurification.jpg"
              alt="Gym Transform"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
