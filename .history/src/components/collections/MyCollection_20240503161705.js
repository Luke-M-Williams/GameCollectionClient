import React, { useState, useEffect } from 'react';
import { fetchUserCollection } from '../../managers/collectionManager';

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user credentials from local storage
    const storedData = localStorage.getItem('game_collection_user');
    if (storedData) {
      const { userId, authToken } = JSON.parse(storedData);
      console.log("UserId:", userId, "AuthToken:", authToken)
      if (userId && authToken) {
        loadCollection(userId, authToken);
      } else {
        console.error('User ID or Auth Token is missing');
      }
    } else {
      console.error('User credentials are not available in local storage.');
    }
  }, []);

  const loadCollection = async (userId, authToken) => {
    try {
      const collection = await fetchUserCollection(userId, authToken);
      setGames(collection);
      setLoading(false);
    } catch (error) {
      console.error('Error loading collection:', error);
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
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyCollection;