import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addGame, getPlatforms } from '../../managers/gameManager';

const AddGame = () => {
  const [title, setTitle] = useState('');
  const [coverArt, setCoverArt] = useState('');
  const [genre, setGenre] = useState('');
  const [developer, setDeveloper] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const [platforms, setPlatforms] = useState([]);
  const [availablePlatforms, setAvailablePlatforms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlatforms = async () => {
        try {
          const platformsData = await getPlatforms();
          if (platformsData && Array.isArray(platformsData.results)) {
            setAvailablePlatforms(platformsData.results);
          } else {
            console.error("Fetched data does not contain an array:", platformsData);
            setAvailablePlatforms([]); // Set to empty array if no valid data is found
          }
        } catch (error) {
          console.error("Failed to fetch platforms:", error);
          setAvailablePlatforms([]); // Ensure the state is set to an empty array on error
        }
      };
    fetchPlatforms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('game_collection_user')
      ? JSON.parse(localStorage.getItem('game_collection_user')).token
      : null;
    const formattedDate = new Date(releaseDate).toISOString().slice(0, 10);
    const gameData = {
      title,
      cover_art: coverArt,
      genre,
      developer,
      release_date: formattedDate,
      platforms, // Send the platforms array directly
    };
  
    try {
      const response = await addGame(gameData, token);
      console.log("Game added:", response);
      navigate("/"); // Redirect or handle post-success operation
    } catch (error) {
      console.error("Registration error:", error);
      window.alert("Failed to add game. Please try again.");
    }
  };

  const handlePlatformChange = (platformId) => {
    if (platforms.includes(platformId)) {
      setPlatforms(platforms.filter(id => id !== platformId));
    } else {
      setPlatforms([...platforms, platformId]);
    }
  };

  return (
    <div>
      <h2>Add Game</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="coverArt">Cover Art URL:</label>
          <input
            type="url"
            id="coverArt"
            value={coverArt}
            onChange={(e) => setCoverArt(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="developer">Developer:</label>
          <input
            type="text"
            id="developer"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="platforms">Platforms:</label>
          <div>
            {availablePlatforms.map(platform => (
              <div key={platform.id}>
                <input
                  type="checkbox"
                  id={`platform-${platform.id}`}
                  checked={platforms.includes(platform.id)}
                  onChange={() => handlePlatformChange(platform.id)}
                />
                <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default AddGame;