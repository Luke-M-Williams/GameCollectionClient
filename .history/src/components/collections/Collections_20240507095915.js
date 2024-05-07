import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';
import { fetchUserById } from '../../managers/userManager';
import './Collections.css';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userMap, setUserMap] = useState({});
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        // Fetch user credentials from local storage
        const storedData = localStorage.getItem('game_collection_user');
        if (storedData) {
            const { valid, token, id } = JSON.parse(storedData);
            if (valid && token) {
                console.log("AuthToken:", token);
                setCurrentUserId(id);
                loadCollections(token);
            } else {
                console.error('Auth Token or valid flag is missing');
            }
        } else {
            console.error('User credentials are not available in local storage.');
        }
    }, []);

    const loadCollections = async (authToken) => {
        try {
            const data = await fetchAllCollections(authToken);
            console.log('Server response:', data);
            if (Array.isArray(data)) {
                setCollections(data);
                const userIds = [...new Set(data.map(collection => collection.user))];
                const userPromises = userIds.map(userId => fetchUserById(userId, authToken));
                const users = await Promise.all(userPromises);
                const userMap = users.reduce((map, user) => {
                    map[user.id] = user;
                    return map;
                }, {});
                setUserMap(userMap);
            } else {
                setError('Unexpected data format from the server');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all collections:', error);
            setError(error.message);
            setLoading(false);
        }
    }
    
    const groupCollectionsByUser = (collections) => {
        return collections.reduce((groupedCollections, collection) => {
            if (!groupedCollections[collection.user]) {
                groupedCollections[collection.user] = [];
            }
            groupedCollections[collection.user].push(collection.game);
            return groupedCollections;
        }, {});
    };

    console.log('Collections:', collections);
    console.log('User Map:', userMap);

    const groupedCollections = groupCollectionsByUser(collections);
    const filteredGroupedCollections = Object.entries(groupedCollections).filter(([userId]) => userId !== currentUserId.toString());

    return (
        <div className="collections-container">
          <h1 className="collections-title">All Game Collections</h1>
          {filteredGroupedCollections.map(([userId, games]) => (
            <div key={userId} className="user-collection">
              <h2 className="user-collection-title">User {userMap[userId]?.username}'s Collection</h2>
              <div className="game-list">
                {games.map(game => (
                  <div key={game.id} className="game-item">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-info">Genre: {game.genre}</p>
                    <p className="game-info">Developer: {game.developer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    };

export default AllGameCollections;