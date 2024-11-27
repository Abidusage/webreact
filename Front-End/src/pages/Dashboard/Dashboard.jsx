import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../../api";
import "../Dashboard/Dashboard.css";
import { ACCESS_TOKEN } from "../../constants";
import AdminResourceForm from "../AdminResourceForm/AdminResourceForm";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN); 
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await api.get("/api/dashboard/", {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = response.data;
      setMessage(data.message || "Welcome to your dashboard");
      setUser(data.user);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="header">
          <h1>Dashboard</h1>
          <p>{message}</p>
          <NavLink to="/user-profile">Create/Update Profile</NavLink> {/* Lien vers le formulaire de profil */}
        </div>
        {user && (
          <div>
            <div className="cards">
              <div className="card">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                {user.profile ? (
                  <>
                    <p>Title Job: {user.profile.title}</p>
                    <p>Description: {user.profile.descriptions}</p>
                    <p>State: {user.profile.state}</p>
                    <p>Phone: {user.profile.phone}</p>
                    <p>Upwork: {user.profile.link_upwork}</p>
                    <p>GitHub: {user.profile.link_github}</p>
                    <p>LinkedIn: {user.profile.link_linkedin}</p>
                    <p>StackOverFlow: {user.profile.stackoverflow}</p>
                  </>
                ) : (
                  <p>No profile information available</p>
                )}
              </div>
            </div>
            {user.isAdmin && (
              <div className="admin-section">
                <h2>Admin Section</h2>
                <p>This section is only visible to administrators.</p>
                <AdminResourceForm />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
