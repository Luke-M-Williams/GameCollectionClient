import React, { useState, useEffect } from 'react';
import { fetchUserCollection, addGameToCollection } from '../../managers/collectionManager';
import { fetchAllGames } from '../../managers/gameManager';

const MyCollection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allGames, setAllGames] = useState([]);
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    // Fetch user credentials from local storage
    const storedData = localStorage.getItem('game_collection_user');
    if (storedData) {
      const { userId, authToken } = JSON.parse(storedData);
      if (userId && authToken) {
        loadCollection(userId, authToken);
        fetchAllGames(authToken)
          .then(games => setAllGames(games))
          .catch(error => console.error('Error fetching all games:', error));
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
        {userGames.map(game => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
      <h2>Add Games to Your Collection</h2>
      <ul>
        {allGames.filter(game => !userGames.some(userGame => userGame.id === game.id)).map(game => (
          <li key={game.id}>
            {game.title}
            <button onClick={() => handleGameSelection(game.id)}>Add to Collection</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCollection;