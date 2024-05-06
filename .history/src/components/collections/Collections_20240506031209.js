import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            fetchAllCollections(authToken)
                .then(data => {
                    setCollections(data.results);
                    setLoading(false);
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
                    <h2>{collection.user.username}'s Collection</h2>
                    <ul>
                        {collection.game ? (
                            <li key={collection.game.id}>{collection.game.title}</li>
                        ) : (
                            collection.games.map(game => (
                                <li key={game.id}>{game.title}</li>
                            ))
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AllGameCollections;