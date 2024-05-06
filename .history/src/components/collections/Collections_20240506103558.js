import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';
import { fetchUserById } from '../../managers/userManager';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userMap, setUserMap] = useState({});

    useEffect(() => {
        // Fetch user credentials from local storage
        const storedData = localStorage.getItem('game_collection_user');
        if (storedData) {
            const { valid, token, id } = JSON.parse(storedData);
            if (valid && token) {
                console.log("AuthToken:", token);
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

    return (
        <div>
            <h1>All Game Collections</h1>
            {Object.entries(groupedCollections).map(([userId, games]) => (
                <div key={userId}>
                    <h2>User {userMap[userId]?.username}'s Collection</h2>
                    <ul>
                        {games.map(game => (
                            <li key={game.id}>
                                {game.title}
                                <br />
                                Genre: {game.genre}
                                <br />
                                Developer: {game.developer}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AllGameCollections;