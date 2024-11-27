import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import "./Profile.css";

const Profile = () => {
  const [title, setTitle] = useState("");
  const [state, setState] = useState("");
  const [linkUpwork, setLinkUpwork] = useState("");
  const [linkGithub, setLinkGithub] = useState("");
  const [linkLinkedin, setLinkLinkedin] = useState("");
  const [linkStackoverflow, setLinkStackoverflow] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const profileData = {
        title,
        state,
        link_upwork: linkUpwork,
        link_github: linkGithub,
        link_linkedin: linkLinkedin,
        link_stackoverflow: linkStackoverflow,
        descriptions: descriptions
      };
      console.log("Profile data to be sent:", profileData);

      const response = await api.post("/api/detailprofile/", profileData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Profile creation response:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Add Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter your title job"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          placeholder="Enter your State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label htmlFor="descriptions">Descriptions:</label>
        <input
          type="text"
          id="descriptions"
          placeholder="Enter your descriptions"
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
          required
        />
        <label htmlFor="upwork">Upwork:</label>
        <div className="input-with-icon">
          <img src="https://img.icons8.com/color/48/000000/upwork.png" alt="Upwork Logo" />
          <input
            type="text"
            id="upwork"
            placeholder="Enter your Upwork link"
            value={linkUpwork}
            onChange={(e) => setLinkUpwork(e.target.value)}
            required
          />
        </div>
        <label htmlFor="github">GitHub:</label>
        <div className="input-with-icon">
          <img src="https://img.icons8.com/color/48/000000/github--v1.png" alt="GitHub Logo" />
          <input
            type="text"
            id="github"
            placeholder="Enter your GitHub link"
            value={linkGithub}
            onChange={(e) => setLinkGithub(e.target.value)}
            required
          />
        </div>
        <label htmlFor="linkedin">LinkedIn:</label>
        <div className="input-with-icon">
          <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn Logo" />
          <input
            type="text"
            id="linkedin"
            placeholder="Enter your LinkedIn link"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
            required
          />
        </div>
        <label htmlFor="stackoverflow">Stackoverflow:</label>
        <div className="input-with-icon">
          <img src="https://img.icons8.com/color/48/000000/stackoverflow.png" alt="StackOverflow Logo" />
          <input
            type="text"
            id="stackoverflow"
            placeholder="Enter your StackOverflow link"
            value={linkStackoverflow}
            onChange={(e) => setLinkStackoverflow(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Profile</button>
        <a href="/dashboard">Cancel</a>
      </form>
    </div>
  );
};

export default Profile;
