import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGame, getPlatforms } from '../../managers/gameManager';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGame(gameId);
        setGame(gameData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch game details:', error);
        setIsLoading(false);
      }
    };

    const fetchPlatformsData = async () => {
        try {
          const platformsData = await getPlatforms();
          if (platformsData && platformsData.results && Array.isArray(platformsData.results)) {
            setPlatforms(platformsData.results);  // Access the array from the results field
            console.log("Platforms set:", platformsData.results); // Log to check the data being set
          } else {
            throw new Error('Unexpected data structure');
          }
        } catch (error) {
          console.error('Failed to fetch platforms:', error);
        }
      };

    fetchGameDetails();
    fetchPlatformsData();
  }, [gameId]);

  const getPlatformNameById = (platformId) => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform ? platform.name : 'Unknown Platform';
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game || Object.keys(game).length === 0) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>{game.title}</h2>
      <img src={game.cover_art} alt={game.title} />
      <p>Genre: {game.genre}</p>
      <p>Developer: {game.developer}</p>
      <p>Release Date: {game.release_date}</p>
      <p>Platforms:</p>
      <ul>
        {platforms.map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetails;