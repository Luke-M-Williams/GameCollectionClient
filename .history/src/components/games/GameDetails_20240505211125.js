import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, getPlatforms, deleteGame } from '../../managers/gameManager';
import { addGameToCollection } from '../../managers/collectionManager';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [platforms, setPlatforms] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { gameId } = useParams();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    const userToken = localStorage.getItem('game_collection_user');
    const token = userToken ? JSON.parse(userToken).token : null;

    try {
      const result = await deleteGame(gameId, token);
      console.log(result);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('Failed to delete the game.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-game/${gameId}`);
  };

  const handleAddToCollection = async () => {
    const userToken = localStorage.getItem('game_collection_user');
    const { userId, authToken } = userToken ? JSON.parse(userToken) : {};

    if (userId && authToken) {
      try {
        await addGameToCollection(userId, gameId, authToken);
        alert('Game added to your collection!');
      } catch (error) {
        console.error('Failed to add game to collection:', error);
        alert('Failed to add the game to your collection.');
      }
    } else {
      console.error('User credentials not found in local storage.');
      alert('Please log in to add games to your collection.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  // Retrieve user ID from local storage
  const userToken = localStorage.getItem('game_collection_user');
  const userId = userToken ? JSON.parse(userToken).id : null;

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
      <button onClick={handleAddToCollection}>Add to Collection</button>
      {userId === game.creator && (
        <>
          <button onClick={handleEdit}>Edit Game</button>
          <button onClick={handleDelete}>Delete Game</button>
        </>
      )}
    </div>
  );
};

export default GameDetails;