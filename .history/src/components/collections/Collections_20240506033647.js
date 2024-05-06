import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            fetchAllCollections(authToken)
                .then(data => {
                    const { results } = data;
                    const userIds = new Set(results.map(collection => collection.user));
                    const userPromises = Array.from(userIds).map(userId => fetchUserById(userId, authToken));

                    Promise.all(userPromises)
                        .then(users => {
                            const usersMap = users.reduce((acc, user) => {
                                acc[user.id] = user;
                                return acc;
                            }, {});

                            setUsers(usersMap);
                            setCollections(results);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error fetching users:', error);
                            setError('Error fetching users');
                            setLoading(false);
                        });
                })
                .catch(error => {
                    console.error('Error fetching all collections:', error);
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            console.error('Auth token is not available in local storage.');
            setError('Auth token is not available in local storage.');
            setLoading(false);
        }
    }, []);

    const fetchUserById = async (userId, authToken) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw error;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>All Game Collections</h1>
            {collections.map(collection => (
                <div key={collection.id}>
                    <h2>{users[collection.user]?.username}'s Collection</h2>
                    <ul>
                        <li key={collection.game.id}>
                            {collection.game.title}
                            <br />
                            Genre: {collection.game.genre}
                            <br />
                            Developer: {collection.game.developer}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AllGameCollections