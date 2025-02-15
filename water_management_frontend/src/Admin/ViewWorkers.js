import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function ViewWorkers() {
  
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

  const [data, setData] = useState({ workers: [], isFetching: false });
  const [searchText, setSearchText] = useState("");
  const [areas, setAreas] = useState([]);

  // Fetch area data from API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
        };
        const response = await axios.get("http://localhost:8080/admin/getAllAreas", config);
        setAreas(response.data);
      } catch (error) {
        toast.error("Failed to load areas", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    };
    fetchAreas();
  }, []);
  

  // Fetch trainers from API
  const fetchWorkers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      setData({ workers: [], isFetching: true });
      const response = await axios.get(
        "http://localhost:8080/admin/getAllWorkers",
        config
      );
      setData({ workers: response.data, isFetching: false });
    } catch (error) {
      console.error("Error fetching workers:", error);
      setData({ workers: [], isFetching: false });
      toast.error("Failed to fetch workers.");
    }
  };

  // Remove trainer
  const removeWorker = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:8080/admin/deleteWorker/${id}`,
        config
      );
      toast.success("Worker deleted successfully!", {
        position: "top-center",
        autoClose: 500,
      });
      setTimeout(() => {
        fetchWorkers(); // Redirect to View Trainers page
      }, 2000);
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Something went wrong while deleting the trainer.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      areaId: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
      areaId: Yup.string().required("Area is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
    
      try {
        // Construct URL with areaId as path variable
        const url = `http://localhost:8080/admin/createWorker?areaId=${values.areaId}`;
        
        // Remove areaId from the form data since it is now in the URL
        const { areaId, ...workerData } = values;
    
        await axios.post(url, workerData, config);
        toast.success("Worker added successfully!", {
          position: "top-center",
          autoClose: 500,
        });
        setTimeout(() => {
          fetchWorkers(); // Reload worker data
          formik.resetForm(); // Reset form fields
        }, 2000);
      } catch (error) {
        console.error("Error adding worker:", error);
        toast.error("Failed to add worker.");
      }
    },    
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Trainer Form */}
          <div className="form-section">
            <h3>Add Worker</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Worker Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Trainer Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  {...formik.getFieldProps("phoneNumber")}
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-danger">{formik.errors.contact}</div>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              
               {/* Address Input */}
            <div className="mb-3">
              <label>Address:</label>
              <input
                type="text"
                {...formik.getFieldProps("address")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            {/* Area Dropdown */}
            <div className="mb-3">
              <label>Area:</label>
              <select
                {...formik.getFieldProps("areaId")}
                className="form-control"
                style={{ height: "35px" }}
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area.areaId} value={area.areaId}>
                    {area.areaName}
                  </option>
                ))}
              </select>
              {formik.touched.areaId && formik.errors.areaId && (
                <div className="text-danger">{formik.errors.areaId}</div>
              )}
            </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Worker
              </button>
            </form>
          </div>

          {/* View Trainers Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Worker Details</h2>
              <input
                type="text"
                className="form-control search-bar"
                placeholder="Search by Name or Area"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Area</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.workers
                  .filter((worker) =>
                    searchText
                      ? worker.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                          worker.area.areaName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true
                  )
                  .map(
                    ({
                      id, name, phoneNumber, email, address, area
                    }) => (
                      <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{phoneNumber}</td>
                      <td>{email}</td>
                      <td>{address}</td>
                      <td>{area.areaName}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              navigate(`/admin/editworker/${id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeWorker(id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
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
          margin-top: 5px;
        }
        .view-section {
          flex: 2;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-bar {
          max-width: 300px;
        }
      `}</style>
    </Admin>
  );
}

export default ViewWorkers;
