// MovieDetailsComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from './rating.component'; // Import the Rating component

const MovieDetailsComponent = () => {
  const { id } = useParams();  // Destructure the parameter as `id`
  const [movieDetails, setMovieDetails] = useState(null);
  const [userRating, setUserRating] = useState(null); // State to store user rating
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token')); 
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://sebackend-awzz.onrender.com/movies/details/${id}`);
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // handle error
      }
    };

    fetchMovieDetails();
  }, [id]);  // Dependency array with `id` to re-fetch if the id changes

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const handleRateMovie = async (movieId, rating) => {
    try {
      const response = await axios.post('/ratings', {
        movieId: movieId,
        rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Movie rated successfully:', response.data);
      setUserRating(rating); // Update the state to reflect the new rating
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <p>
      {isLoggedIn ? (
      <>
      <Rating movie={movieDetails} onRate={handleRateMovie} />
      {userRating !== null && <p>You rated this movie: {userRating} / 10</p>}
      </>
      ) : (<></>) }</p>
      <p><strong>Plot:</strong> {movieDetails.plot}</p>
      <p><strong>Full Plot:</strong> {movieDetails.fullplot}</p>
      <p><strong>Genres:</strong> {movieDetails.genres.join(', ')}</p>
      <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
      <p><strong>Cast:</strong> {movieDetails.cast.join(', ')}</p>
      <p><strong>Languages:</strong> {movieDetails.languages.join(', ')}</p>
      <p><strong>Release Date:</strong> {movieDetails.released ? new Date(movieDetails.released).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Directors:</strong> {movieDetails.directors.join(', ')}</p>
      <p><strong>Writers:</strong> {movieDetails.writers.join(', ')}</p>
      <p><strong>Awards:</strong> {movieDetails.awards ? `${movieDetails.awards.wins} wins, ${movieDetails.awards.nominations} nominations` : 'N/A'}</p>
      <p><strong>Year:</strong> {movieDetails.year}</p>
      <p><strong>IMDB:</strong> {movieDetails.imdb ? `Rating: ${movieDetails.imdb.rating}, Votes: ${movieDetails.imdb.votes}` : 'N/A'}</p>
      <p><strong>Countries:</strong> {movieDetails.countries.join(', ')}</p>
      <p><strong>Type:</strong> {movieDetails.type}</p>
      <p><strong>Rotten Tomatoes Viewer Score:</strong> {movieDetails.tomatoes && movieDetails.tomatoes.viewer ? `${movieDetails.tomatoes.viewer.rating}/10` : 'N/A'}</p>
      <p><strong>Number of Comments:</strong> {movieDetails.num_mflix_comments}</p>
     
    </div>
  );
};

export default MovieDetailsComponent;
