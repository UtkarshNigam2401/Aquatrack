import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Admin from "./Admin";

function ViewCustomer() {
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

  const [data, setData] = useState({ customers: [], isFetching: false });
  const [searchText, setSearchText] = useState(""); // State for search text

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    fetchcustomers();
  }, []);

  const fetchcustomers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      setData((data) => ({ customers: [], isFetching: true })); // Set loading state
      const response = await axios.get(
        "http://localhost:8080/admin/getAllUser",
        config
      );
      console.log("Response:", response); // Check the response in the console
      if (response.data) {
        setData({ customers: response.data, isFetching: false });
      } else {
        setData({ customers: [], isFetching: false });
        toast.error("No data received.");
      }
    } catch (e) {
      console.error(e);
      setData((data) => ({ customers: [], isFetching: false })); // Reset on error
      toast.error("Failed to fetch customers.");
    }
  };

  const removeCustomer = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    axios
      .delete(`http://localhost:8080/admin/deleteUser/${id}`, config)
      .then((response) => {
        toast.success("Customer deleted successfully!", {
          position: "top-center",
          autoClose: 500,
        });
        setTimeout(() => {
          fetchcustomers(); // Redirect to View Trainers page
        }, 2000);
      })
      .catch((error) => {
        toast.error("Something Went Wrong !!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        alert("Error!!!");
      });
    navigate("/admin/viewcustomers");
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="view-container">
        <h2 className="text-center">View Customers Details</h2>

        {/* Search input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Area"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <table className="table table-striped table-secondary table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Area</th>
              <th>Registration Date</th>
             
            </tr>
          </thead>
          <tbody>
            {data.customers
              .filter((customer) => {
                if (searchText === "") {
                  return true; // Show all customers when search text is empty
                }
                return customer.area?.areaName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()); // Filter by areaName
              })
              .map(
                ({
                  id,
                  name,
                  phoneNumber,
                  email,
                  address,
                  area,
                  registrationDate,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{phoneNumber}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                    <td>{area?.areaName}</td>
                    <td>{registrationDate}</td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewCustomer;
