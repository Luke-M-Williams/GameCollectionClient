import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';
import { fetchUserById } from '../../managers/userManager';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState({})

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
            const response = await fetchAllCollections(authToken);
            console.log('Server response:', response); // Add this line
    
            if (response.ok) {
                const data = await response.json();
                console.log('Parsed data:', data); // Add this line
                if (Array.isArray(data)) {
                    setCollections(data);
                } else {
                    setError('Unexpected data format from the server');
                }
            } else {
                setError(`Error fetching collections: ${response.status}`);
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
            {collections.map(collection => (
                <div key={collection.id}>
                <h2>
                    {collection.userDetails.username}'s Collection
                </h2>
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
    )
}

export default AllGameCollections;