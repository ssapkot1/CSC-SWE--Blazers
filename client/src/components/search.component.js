import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory

const SearchComponent = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory(); // Initialize useHistory

  const onSearch = async () => {
    try {
      const response = await axios.get(`https://sebackend-awzz.onrender.com/search?term=${term}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error
    }
  };

  // New function to handle clicking on a search result
  const onResultClick = (movieId) => {
    console.log(movieId)
    history.push(`/movies/details/${movieId}`); // Redirect to the movie details page
  };

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={onSearch}>Search</button>
      <ul>
        {results.map((movie) => (
          // Update the list item to be clickable
          <li key={movie._id} onClick={() => onResultClick(movie._id)} style={{ cursor: 'pointer' }}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
