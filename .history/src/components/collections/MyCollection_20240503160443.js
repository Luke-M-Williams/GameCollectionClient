import React, { useState, useEffect } from 'react';
import { fetchUserCollection, addGameToCollection, removeGameFromCollection } from '../../managers/collectionManager';

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize state for userId and authToken
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Function to load the user details from local storage
    const loadUserCredentials = () => {
      const userCredentials = JSON.parse(localStorage.getItem('game_collection_user'));
      if (userCredentials && userCredentials.userId && userCredentials.authToken) {
        setUserId(userCredentials.userId);
        setAuthToken(userCredentials.authToken);
      } else {
        console.error('User credentials are not available in local storage.');
      }
    };

    loadUserCredentials();
  }, []);

  useEffect(() => {
    if (userId && authToken) {
      console.log("UserId:", userId, "AuthToken:", authToken); // Debug logging
      const loadCollection = async () => {
        const collection = await fetchUserCollection(userId, authToken);
        setGames(collection);
        setLoading(false);
      };

      loadCollection();
    }
  }, [userId, authToken]);

  const handleAddGame = async (gameId) => {
    const result = await addGameToCollection(userId, gameId, authToken);
    if (result) {
      setGames([...games, { id: gameId }]); // Simplified; adjust based on actual game data structure
    }
  };

  const handleRemoveGame = async (gameId) => {
    const result = await removeGameFromCollection(userId, gameId, authToken);
    if (result) {
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Game Collection</h1>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            {game.title}
            <button onClick={() => handleRemoveGame(game.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCollection;