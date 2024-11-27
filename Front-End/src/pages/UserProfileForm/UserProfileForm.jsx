import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";
import "./UserProfileForm.css"; // Importer le fichier CSS

const UserProfileForm = () => {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [linkUpwork, setLinkUpwork] = useState("");
  const [linkGithub, setLinkGithub] = useState("");
  const [linkLinkedin, setLinkLinkedin] = useState("");
  const [linkStackoverflow, setLinkStackoverflow] = useState("");
  const [isEditing, setIsEditing] = useState(true); // Par défaut en mode édition pour le premier rendu
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get("/api/detailprofile/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profile = response.data;
      setTitle(profile.title || "");
      setDescriptions(profile.descriptions || "");
      setState(profile.state || "");
      setPhone(profile.phone || "");
      setLinkUpwork(profile.link_upwork || "");
      setLinkGithub(profile.link_github || "");
      setLinkLinkedin(profile.link_linkedin || "");
      setLinkStackoverflow(profile.stackoverflow || "");
      setIsEditing(false); // Basculer en mode affichage après le chargement des données
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const profileData = {
      title,
      descriptions,
      state,
      phone,
      link_upwork: linkUpwork,
      link_github: linkGithub,
      link_linkedin: linkLinkedin,
      stackoverflow: linkStackoverflow
    };

    try {
      await api.put("/api/detailprofile/", profileData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setIsEditing(false); // Quitter le mode d'édition après la mise à jour
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const ensureHttp = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="user-profile-form-container">
      <h2>Create/Update Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="user-profile-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title Job"
            required
          />
          <textarea
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
            placeholder="Descriptions"
            required
          ></textarea>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            value={linkUpwork}
            onChange={(e) => setLinkUpwork(e.target.value)}
            placeholder="Upwork Link"
            required
          />
          <input
            type="text"
            value={linkGithub}
            onChange={(e) => setLinkGithub(e.target.value)}
            placeholder="GitHub Link"
            required
          />
          <input
            type="text"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
            placeholder="LinkedIn Link"
            required
          />
          <input
            type="text"
            value={linkStackoverflow}
            onChange={(e) => setLinkStackoverflow(e.target.value)}
            placeholder="StackOverflow Link"
            required
          />
          <button type="submit">Save Profile</button>
        </form>
      ) : (
        <div className="profile-display">
          <p><strong>Title Job:</strong> {title}</p>
          <p><strong>Description:</strong> {descriptions}</p>
          <p><strong>State:</strong> {state}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Upwork Link:</strong> <a href={ensureHttp(linkUpwork)} target="_blank" rel="noopener noreferrer">{linkUpwork}</a></p>
          <p><strong>GitHub Link:</strong> <a href={ensureHttp(linkGithub)} target="_blank" rel="noopener noreferrer">{linkGithub}</a></p>
          <p><strong>LinkedIn Link:</strong> <a href={ensureHttp(linkLinkedin)} target="_blank" rel="noopener noreferrer">{linkLinkedin}</a></p>
          <p><strong>StackOverflow Link:</strong> <a href={ensureHttp(linkStackoverflow)} target="_blank" rel="noopener noreferrer">{linkStackoverflow}</a></p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
