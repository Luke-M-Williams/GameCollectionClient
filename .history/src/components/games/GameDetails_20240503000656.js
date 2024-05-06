import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing URL parameters

const GameDetails = ({ getGameById, getPlatforms }) => {
  const [game, setGame] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const { gameId } = useParams(); // Assuming you're using React Router and gameId is a URL parameter

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const platformsData = await getPlatforms();
        const platformMap = platformsData.reduce((map, platform) => {
          map[platform.id] = platform.name; // Assume platform data includes id and name
          return map;
        }, {});

        const gameData = await getGameById(gameId);
        setPlatforms(platformMap);
        setGame(gameData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.cover_art} alt={game.title} />
      <p>{game.genre}</p>
      <p>Developed by {game.developer}</p>
      <p>Released on {new Date(game.release_date).toDateString()}</p>
      <h3>Platforms</h3>
      <ul>
        {game.platforms.map(platformId => (
          <li key={platformId}>{platforms[platformId]}</li> // Display platform names
        ))}
      </ul>
    </div>
  );
};

export default GameDetails;