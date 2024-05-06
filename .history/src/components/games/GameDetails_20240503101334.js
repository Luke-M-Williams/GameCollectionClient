import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, getPlatforms, updateGame, deleteGame } from '../../managers/gameManager';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const platformsData = await getPlatforms();
        const platformMap = platformsData.reduce((map, platform) => {
          map[platform.id] = platform.name; // Adjust based on your platform object structure
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
  }, [gameId]);  // Dependency array to prevent re-fetching on every render

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  const handleDelete = async () => {
    const userToken = localStorage.getItem('game_collection_user');
    const token = userToken ? JSON.parse(userToken).token : null;

    try {
      await deleteGame(gameId, token);
      navigate('/');  // Redirect to the home page or list page
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('Failed to delete the game.');
    }
  };

  const handleEdit = () => {
    // Redirect to an edit page if you have one, or toggle an edit mode in this component
    navigate(`/edit-game/${gameId}`);  // Assuming you have a route set up for editing
  };

  if (isLoading) return <p>Loading...</p>;
  if (!game) return <p>Game not found.</p>;

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
      <button onClick={handleEdit}>Edit Game</button>
      <button onClick={handleDelete}>Delete Game</button>
    </div>
  );
};

export default GameDetails;