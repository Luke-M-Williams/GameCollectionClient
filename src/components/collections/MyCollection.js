import React, { useState, useEffect } from 'react';
import { fetchUserCollection, addGameToCollection } from '../../managers/collectionManager';
import { getGames } from '../../managers/gameManager';

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allGames, setAllGames] = useState([]);
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    // Fetch user credentials from local storage
    const storedData = localStorage.getItem('game_collection_user');
    if (storedData) {
      const { valid, token, id } = JSON.parse(storedData);
      if (valid && token && id) {
        console.log("UserId:", id, "AuthToken:", token);
        loadCollection(id, token);
      } else {
        console.error('User ID, Auth Token, or valid flag is missing');
      }
    } else {
      console.error('User credentials are not available in local storage.');
    }
  }, []);

  const loadCollection = async (userId, authToken) => {
    try {
      const collection = await fetchUserCollection(userId, authToken);
      setUserGames(collection);
      setLoading(false);
    } catch (error) {
      console.error('Error loading collection:', error);
    }
  };

  const handleGameSelection = async (gameId) => {
    const storedData = localStorage.getItem('game_collection_user');
    if (storedData) {
      const { userId, authToken } = JSON.parse(storedData);
      if (userId && authToken) {
        try {
          await addGameToCollection(userId, gameId, authToken);
          setUserGames([...userGames, allGames.find(game => game.id === gameId)]);
        } catch (error) {
          console.error('Error adding game to collection:', error);
        }
      } else {
        console.error('User ID or Auth Token is missing');
      }
    } else {
      console.error('User credentials are not available in local storage.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Game Collection</h1>
      <ul>
        {userGames.map((collectionItem) => (
          <li key={collectionItem.id}>
            <h3>{collectionItem.game.title}</h3>
            {/* Render other game information as needed */}
            <p>Genre: {collectionItem.game.genre}</p>
            <p>Developer: {collectionItem.game.developer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCollection;