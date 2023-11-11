import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // For redirection
import Button from 'react-bootstrap/Button';

const ProfileComponent = () => {
  const [userData, setUserData] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Fetch user data here if needed
    // Assuming the token is stored in localStorage and your backend can identify the user based on this token
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., redirect to login if unauthorized
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or any auth data
    history.push('/login'); // Redirect to the login page
  };

  return (
    <div className="profile-wrapper">
      <h1>User Profile</h1>
      {/* Display user data */}
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Add more user details as needed */}
      
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default ProfileComponent;
