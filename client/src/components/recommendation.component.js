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
            const isLoggedIn = !!localStorage.getItem('token');
            
            let url;
            if (isLoggedIn) {
                // Fetch personalized recommendation from the server
                url = 'https://sebackend-awzz.onrender.com/movies/recommendation';
            } else {
                // Fetch a random movie suggestion from the server
                url = 'https://sebackend-awzz.onrender.com/movies/random'; // Update this URL as needed
            }
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMovie(response.data);
            console.log(movie)
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
                    <p>
                    {isLoggedIn ? (
                        <>
                            Summary: {movie.overview}
                        </>
                    ) : (
                        <>
                            Summary: {movie.plot}
                        </>
                    )}
                </p>
                    {/* Display movie poster if available */}
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`Poster of ${movie.title}`} />
                    )}
                </div>
            ) : (
                <p>No movie data available.</p>
            )}
        </div>
    );
};

export default RecommendationComponent;
