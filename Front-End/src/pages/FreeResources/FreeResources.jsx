import React, { useEffect, useState } from 'react';
import api from '../../api';
import { ACCESS_TOKEN } from '../../constants';

import "../FreeResources/FreeResources.css"; // Chemin corrigé

const FreeResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get('/api/resources/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setResources(response.data);  // Mettez à jour l'état avec les données reçues
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  return (
    <div className="resources-container">
      <h1>Free Learning Resources</h1>
      <div className="resources-list">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <h2>{resource.name}</h2>
              <p>{resource.descriptions}</p>
              <a href={`https://${resource.link}`} target="_blank" rel="noopener noreferrer" className="resource-link">Access Course</a>
            </div>
          ))
        ) : (
          <p>No resources available at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default FreeResources;
