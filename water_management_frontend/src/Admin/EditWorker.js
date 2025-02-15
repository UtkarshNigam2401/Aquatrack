import React, { useEffect, useState } from "react";
import { useNavigate,useParams  } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditWorker() {
  const navigate = useNavigate();
  const { id } = useParams(); 

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
  
  const userUrl = `http://localhost:8080/admin/getWorkerById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updateWorker/${id}`;
  const areasUrl = "http://localhost:8080/admin/getAllAreas";

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    registrationDate: "",
    area: {
      areaId: "",
      areaName: "",
    },
  });

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Fetch user details
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
    };

    axios
      .get(userUrl, config)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch user details");
        console.error(error);
      });

    // Fetch all available areas
    axios
      .get(areasUrl, config)
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch areas");
        console.error(error);
      });
  }, [userUrl, areasUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAreaChange = (e) => {
    const selectedArea = areas.find((area) => area.areaId === parseInt(e.target.value));
    setUserData((prevState) => ({
      ...prevState,
      area: selectedArea,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...userData,
      area: {
        areaId: userData.area.areaId,
        areaName: userData.area.areaName,
        dailyWaterQuota: userData.area.dailyWaterQuota,
      },
    };

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
    };

    axios
      .put(updateUrl, payload, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewworkers");
        }, 1500);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  return (
    <Admin>
    <div className="d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div
        className="shadow-lg p-4"
        style={{
          width: "35rem",
          color: "white",
          border: "2px solid #00b7ff9a",
          backgroundColor: "black",
        }}
      >
        <h2 className="text-center mb-4">Edit User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              maxLength={10}
              pattern="\d{10}"
            />
          </div>

          <div className="mb-3">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label>Registration Date:</label>
            <input
              type="text"
              className="form-control"
              value={userData.registrationDate}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Area:</label>
            <select
              className="form-control"
              value={userData.area.areaName}
              onChange={handleAreaChange}
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-light w-100" style={{ backgroundColor: "#00b7ff9a",color:"white" }}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    </Admin>
  );
}

export default EditWorker;
