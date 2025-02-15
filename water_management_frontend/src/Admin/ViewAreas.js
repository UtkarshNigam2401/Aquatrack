import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Admin from "./Admin";

function ViewAreas() {
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

  const [data, setData] = useState({ areas: [] });
  const [areaName, setAreaName] = useState("");
  const [dailyWaterQuota, setDailyWaterQuota] = useState("");

  // Flag to prevent duplicate toasts
  const toastDisplayedRef = useRef(false);

  // Fetch areas
  const fetchAreas = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/admin/getAllAreas", config
      );
      setData({ areas: response.data });
    } catch (error) {
      console.error("Error fetching areas:", error);
      setData({ areas: [] });
      if (!toastDisplayedRef.current) {
        toastDisplayedRef.current = true; // Prevent multiple toasts
      }
    }
  };

  const removeArea = async (id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
    };

    try {
        await axios.delete(
            `http://localhost:8080/admin/deleteArea/${id}`,
            config
        );
        toast.success("Area deleted successfully!", {
            position: "top-center",
            autoClose: 500,
        });
        fetchAreas();  // Refresh the list after deletion
    } catch (error) {
        console.error("Area can't be removed");
        toast.error("Area can't be removed, assigned to customer");
    }
};


  useEffect(() => {
    fetchAreas();
  }, []);

  // Add Area
  const handleAddArea = async (e) => {
    e.preventDefault();
    if (!areaName || !dailyWaterQuota) {
      toast.error("Please fill all fields before adding the area.");
      return;
    }

    const payload = {
      areaName,
      dailyWaterQuota,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      await axios.post(
        "http://localhost:8080/admin/createArea",
        payload,
        config
      );

      // Show success toast
      toast.success("Area added successfully!", {
        position: "top-center",
        autoClose: 500, // Toast will auto-close after 500ms
      });

      // Reset form fields and fetch updated data after the toast
      setTimeout(() => {
        setAreaName("");
        setDailyWaterQuota("");
        fetchAreas(); // Fetch updated area list
      }, 2000); // Match the autoClose duration of the toast
    } catch (error) {
      // Log the error for debugging
      console.error("Error in adding area:", error);

      // Show error toast
      toast.error("Failed to add area. Please try again.", {
        position: "top-center",
        autoClose: 500,
      });
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Area Form */}
          <div
            className="form-section"
            style={{
              backgroundColor: "#1e1c1c",
              color: "white",
              minHeight: "40vh",
              maxHeight: "50vh"
            }}
          >
            <h3>Add Area</h3>
            <form className="form" onSubmit={handleAddArea}>
              <div className="form-group">
                <label>Area Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Area Name"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Daily Water Quota</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Daily Water Quota"
                  value={dailyWaterQuota}
                  onChange={(e) => setDailyWaterQuota(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#00b7ff9a" }}
                type="submit"
              >
                Add Area
              </button>
            </form>
          </div>

          {/* View Areas Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Area Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Area ID</th>
                  <th>Area Name</th>
                  <th>Daily Water Quota</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.areas.length > 0 ? (
                  data.areas.map(({ areaId, areaName, dailyWaterQuota }) => (
                    <tr key={areaId}>
                      <td>{areaId}</td>
                      <td>{areaName}</td>
                      <td>{dailyWaterQuota}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeArea(areaId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No area data available</td>
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
        .form-section {
          flex: 1;
          background: #1e1c1c;
          color: white;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
        }
        .btn-primary {
          background: #aeff00;
          border: none;
        }
        .view-section {
          flex: 3;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        .btn-sm {
          margin: 2px;
        }
      `}</style>
    </Admin>
  );
}

export default ViewAreas;
