import React, { useEffect, useState } from 'react';
import api from '../../api';
import './FreeDev.css';

const FreeDev = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/list_users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1>FreeDev</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.profile?.picture || '/public/sage.png'} alt={`${user.username} profile`} className="profile-picture" />
            <h1 className='user'>{user.username}</h1>
            {user.profile && (
              <div className="profile-details">
                <h1>{user.profile.title}</h1>
                <p>{user.profile.descriptions}</p>
                <div className="social-links">
                  {user.profile.link_upwork && <a href={user.profile.link_upwork} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                  {user.profile.link_github && <a href={user.profile.link_github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>}
                  {user.profile.link_linkedin && <a href={user.profile.link_linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                  {user.profile.stackoverflow && <a href={user.profile.stackoverflow} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeDev;
