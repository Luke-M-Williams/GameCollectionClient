import React, { useState, useEffect } from 'react';
import { fetchUserCollection, addGameToCollection, removeGameFromCollection } from '../../managers/collectionManager';
import { getGames } from '../../managers/gameManager';
import './MyCollection.css';

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

  const handleRemoveGame = async (gameId) => {
    const storedData = localStorage.getItem('game_collection_user');
    if (storedData) {
      const { id: userId, token } = JSON.parse(storedData);
      if (userId && token) {
        try {
          await removeGameFromCollection(userId, gameId, token);
          setUserGames(userGames.filter(game => game.id !== gameId));
        } catch (error) {
          console.error('Error removing game from collection:', error);
        }
      } else {
        console.error('User ID or Auth Token is missing');
      }
    } else {
      console.error('User credentials are not available in local storage.');
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
    <div className="collection-container">
      <h1 className="collection-title">Your Game Collection</h1>
      <div className="game-list">
        {userGames.map((collectionItem) => (
          <div key={collectionItem.id} className="game-item">
            <h3 className="game-title">{collectionItem.game.title}</h3>
            <p className="game-info">Genre: {collectionItem.game.genre}</p>
            <p className="game-info">Developer: {collectionItem.game.developer}</p>
            <button className="delete-button" onClick={() => handleRemoveGame(collectionItem.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;