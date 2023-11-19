import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const RecommendationComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
        fetchMovie();
    }, []);

    const fetchMovie = async () => {
        setIsLoading(true);
        try {
            let url;
            if (isLoggedIn) {
                // Fetch personalized recommendation from the server
                url = 'http://localhost:4000/recommendation';
            } else {
                // Fetch a random movie suggestion from the server
                url = 'http://localhost:4000/movies/random'; // Update this URL as needed
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMovie(response.data);
        } catch (error) {
            console.error('Error fetching movie:', error);
            if (!isLoggedIn) {
                history.push('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recommendation-wrapper">
            {movie ? (
                <div>
                    <h1>{isLoggedIn ? 'Your Personalized Recommendation' : 'Random Movie Suggestion'}</h1>
                    <p>Title: {movie.title}</p>
                    <p>Summary: {movie.plot}</p>
                    {/* Add more movie details display as needed */}
                </div>
            ) : (
                <p>No movie data available.</p>
            )}
        </div>
    );
};

export default RecommendationComponent;
