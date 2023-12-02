import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [userRatedMovies, setUserRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://blazeback.onrender.com/profile/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
        console.log(response.data._id);
        const userRatings = await axios.get(`https://blazeback.onrender.com/ratings/${response.data._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (userRatings.data.message.length > 0) {
          console.log(userRatings.data.message[0].ratings);
          setUserRatedMovies(userRatings.data.message[0].ratings);
        }
        console.log(userRatings.data.message);
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
          <h3>Ratings</h3>
          {userRatedMovies.length > 0 && (
            <table>
              <thead>
                <th>MovieId</th>
                <th>Rating</th>
              </thead>
              <tbody>
                {userRatedMovies.map((rating) => (
                  <tr>  
                    <td>{rating.movie}</td>
                    <td>{rating.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <p>User data not found.</p>
      )}
    </div>
  );
};

export default ProfileComponent;
