import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            if (data.results) {
                setCollections(data.results);
            } else {
                setError('Unexpected data format from the server');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all collections:', error);
            setError(error.message);
            setLoading(false);
        }
    };
    

    return (
        <div>
            <h1>All Game Collections</h1>
            {collections && collections.length > 0 ? (
                collections.map(collection => (
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
                ))
            ) : (
                <p>No collections found.</p>
            )}
        </div>
    );
}

export default AllGameCollections;