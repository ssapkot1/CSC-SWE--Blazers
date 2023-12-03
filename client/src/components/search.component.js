import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const SearchComponent = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory(); 

  const onSearch = async () => {
    try {
      const response = await axios.get(`https://blazeback.onrender.com/search?term=${term}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);

    }
  };


  const onResultClick = (movieId) => {
    console.log(movieId)
    history.push(`/movies/details/${movieId}`);
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

          <li key={movie._id} onClick={() => onResultClick(movie._id)} style={{ cursor: 'pointer' }}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
