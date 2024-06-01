import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GenreMenu({ setSearchKey }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
        params: {
          api_key: "4f5f43495afcc67e9553f6c684a82f84",
        },
      });
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  return (
    <select onChange={(e) => setSearchKey(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      ))}
    </select>
  );
}

export default GenreMenu;
