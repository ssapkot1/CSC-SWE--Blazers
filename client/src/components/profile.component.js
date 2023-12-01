import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://sebackend-awzz.onrender.com/profile/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        history.push('/login'); // Redirect to login on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-wrapper">
      <h1>User Profile</h1>
      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <p>User data not found.</p>
      )}
    </div>
  );
};

export default ProfileComponent;
