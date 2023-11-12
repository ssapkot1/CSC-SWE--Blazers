import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './rating.component'; // Ensure this path is correct

const ProfileComponent = () => {
  const [userData, setUserData] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [userRating, setUserRating] = useState(null); // Added state for userRating
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [ratingsCount, setRatingsCount] = useState(0);

  useEffect(() => {
    const fetchUserDataAndRandomMovie = async () => {
      try {
        // Fetch user data
        const userDataResponse = await axios.get('http://localhost:4000/profile/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(userDataResponse.data);

        // Fetch a random movie
        const randomMovieResponse = await axios.get('http://localhost:4000/movies/random', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRandomMovie(randomMovieResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        history.push('/login'); // Redirect to login on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAndRandomMovie();
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const handleRateMovie = async (movieId, rating) => {
    try {
      const response = await axios.post('http://localhost:4000/ratings', {
        movieId: movieId,
        rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Movie rated successfully:', response.data);
      setUserRating(rating); // Update the state to reflect the new rating
      setRatingsCount(prevCount => prevCount + 1)
  
      // Fetch a new random movie after successful rating
      const randomMovieResponse = await axios.get('http://localhost:4000/movies/random', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRandomMovie(randomMovieResponse.data); // Set new random movie to state
      setUserRating(null); // Reset the user rating for the new movie
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleGetSuggestion = () => {
    // Implement functionality to get a movie suggestion
    console.log('Get a movie suggestion');
  };

  return (
    <div className="profile-wrapper">
      <h1>User Profile</h1>
      {userData && ratingsCount < 20 && (
        <p>Movies rated: {ratingsCount} / 20. Rate {20 - ratingsCount} more movies to get a suggestion!</p>
      )}
      {userData && ratingsCount >= 20 && (
        <Button variant="success" onClick={handleGetSuggestion}>Get Suggestion</Button>
      )}
      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {randomMovie ? (
            <div>
              <h2>Rate a Movie</h2>
              <Rating movie={randomMovie} onRate={handleRateMovie} />
              {userRating !== null && <p>You rated this movie: {userRating} / 10</p>}
            </div>
          ) : (
            <p>Loading new movie...</p> // Show loading state while fetching new movie
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
