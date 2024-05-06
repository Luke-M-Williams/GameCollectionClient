import React, { useState, useEffect } from 'react';
import { fetchUserCollection, addGameToCollection, removeGameFromCollection } from '../../managers/collectionManager';

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Fetch user credentials from local storage
    const userCredentials = JSON.parse(localStorage.getItem('game_collection_user'));
    if (userCredentials && userCredentials.userId && userCredentials.authToken) {
      setUserId(userCredentials.userId); // Ensure this key matches what's stored in local storage
      setAuthToken(userCredentials.authToken);
    } else {
      console.error('User credentials are not available in local storage.');
    }
  }, []);

  useEffect(() => {
    // Load the collection only if userId and authToken are available
    if (userId && authToken) {
      const loadCollection = async () => {
        try {
          const collection = await fetchUserCollection(userId, authToken);
          setGames(collection);
        } catch (error) {
          console.error("Error fetching user collection:", error);
        }
        setLoading(false);
      };

      loadCollection();
    }
  }, [userId, authToken]);

  // Add and remove game handlers
  const handleAddGame = async (gameId) => {
    const result = await addGameToCollection(userId, gameId, authToken);
    if (result) {
      setGames(prevGames => [...prevGames, { id: gameId }]);
    }
  };

  const handleRemoveGame = async (gameId) => {
    const result = await removeGameFromCollection(userId, gameId, authToken);
    if (result) {
      setGames(prevGames => prevGames.filter(game => game.id !== gameId));
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