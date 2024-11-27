import React, { useState, useEffect } from "react";
import api from "../../api";
import "../AdminResourceForm/AdminResourceForm.css";
import { ACCESS_TOKEN } from "../../constants";

const AdminResourceForm = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [link, setLink] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get("/api/resources/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const resourceData = { name, categories, descriptions, link };

    try {
      await api.post("/api/add_resource/", resourceData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      fetchResources();
      setName("");
      setCategories("");
      setDescriptions("");
      setLink("");
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const handleDelete = async (resourceId) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    try {
      await api.delete(`/api/resources/delete/${resourceId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchResources(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="admin-resource-form-container">
      <h2>Manage Resources</h2>
      <form onSubmit={handleSubmit} className="admin-resource-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Resource Name"
          required
        />
        <input
          type="text"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Categories"
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Resource Link"
          required
        />
        <button type="submit">Add Resource</button>
      </form>

      <div className="resources-list">
        <h3>Existing Resources</h3>
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <p><strong>Name:</strong> {resource.name}</p>
            <p><strong>Categories:</strong> {resource.categories}</p>
            <p><strong>Descriptions:</strong> {resource.descriptions}</p>
            <p><strong>Link:</strong> <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a></p>
            <button onClick={() => handleDelete(resource.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResourceForm;
