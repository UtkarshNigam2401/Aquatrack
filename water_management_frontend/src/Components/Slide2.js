import React from "react";
import {
  FaBuilding,
  FaUsers,
  FaTint,
  FaHome,
  FaCity,
  FaHandHoldingWater,
} from "react-icons/fa";

const Slide2 = () => {
  const stats = [
    {
      icon: <FaBuilding size={50} color="#b5dceb" />,
      value: "196",
      description: "Offices spread across the state",
    },
    {
      icon: <FaUsers size={50} color="#b5dceb" />,
      value: "2339",
      description: "Total Employees",
    },
    {
      icon: <FaTint size={50} color="#b5dceb" />,
      value: "47",
      description: "Water Supply schemes managed by AQUATRACK",
    },
    {
      icon: <FaHome size={50} color="#b5dceb" />,
      value: "11514",
      description: "Completed Rural Schemes",
    },
    {
      icon: <FaCity size={50} color="#b5dceb" />,
      value: "476",
      description: "Completed Urban Schemes",
    },
    {
      icon: <FaHandHoldingWater size={50} color="#b5dceb" />,
      value: "929",
      description: "Schemes under JJM",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <h1 className="value">{stat.value}</h1>
          <p className="description">{stat.description}</p>
        </div>
      ))}
      <style jsx>{`
        .stats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 40px auto;
          max-width: 1200px;
        }
        .stat-card {
          flex: 1 1 calc(33.333% - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
        }
        .icon {
          margin-bottom: 10px;
        }
        .value {
          font-size: 2.5rem;
          color: #333;
          margin: 10px 0;
        }
        .description {
          font-size: 1rem;
          color: #555;
        }
        @media (max-width: 768px) {
          .stat-card {
            flex: 1 1 calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .stat-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slide2;
