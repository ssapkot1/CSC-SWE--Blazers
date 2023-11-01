import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/movies/search?q=${value}`
        );

        setSuggestions(data.movies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.textbox}
        placeholder="Search data..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;