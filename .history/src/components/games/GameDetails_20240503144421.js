import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, getPlatforms, deleteGame } from '../../managers/gameManager';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { gameId } = useParams();
  const navigate = useNavigate();  // Ensure this is properly called to use in the component

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const platformsData = await getPlatforms();
        const platformMap = platformsData.reduce((map, platform) => {
          map[platform.id] = platform.name;
          return map;
        }, {});

        const gameData = await getGame(gameId);
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

const handleDelete = async (gameId) => {
  const userToken = localStorage.getItem('game_collection_user');
  const token = userToken ? JSON.parse(userToken).token : null;

  if (!token) {
    alert("No authentication token found. Please log in.");
    return;
  }

  try {
    const message = await deleteGame(gameId, token);
    console.log(message);
    // Redirect or refresh the component
  } catch (error) {
    console.error("Failed to delete game:", error.message);
    alert("Failed to delete game.");
  }
}

  const handleEdit = () => {
    navigate(`/edit-game/${gameId}`);  // Navigate to edit page
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  return (
    <div>
      <h1>{game.title}</h1>
      <img src={game.cover_art} alt={game.title} />
      <p>Genre: {game.genre}</p>
      <p>Developed by {game.developer}</p>
      <p>Released on {new Date(game.release_date).toDateString()}</p>
      <h3>Platforms</h3>
      <ul>
        {game.platforms.map(platformId => (
          <li key={platformId}>{platforms[platformId]}</li>
        ))}
      </ul>
      <button onClick={handleEdit}>Edit Game</button>
      <button onClick={handleDelete}>Delete Game</button>
    </div>
  );
};

export default GameDetails;