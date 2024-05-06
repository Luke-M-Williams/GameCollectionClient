import React, { useState, useEffect } from 'react';
import { fetchAllCollections } from '../../managers/collectionManager';
import { fetchUserById } from '../../managers/userManager';

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
            const collectionsData = await fetchAllCollections(authToken);
            console.log('Server response:', collectionsData);
            if (Array.isArray(collectionsData)) {
                const userPromises = collectionsData.map(collection =>
                    fetchUserById(collection.user, authToken)
                );
                const userDetails = await Promise.all(userPromises);
    
                // Create a mapping of user IDs to usernames
                const userMap = userDetails.reduce((acc, user) => {
                    acc[user.id] = user.username; // Adjust depending on your user object structure
                    return acc;
                }, {});
    
                // Map collections to include usernames
                const collectionsWithUsernames = collectionsData.map(collection => ({
                    ...collection,
                    username: userMap[collection.user]
                }));
    
                setCollections(collectionsWithUsernames);
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
    
    console.log('Collections:', collections)

    return (
        <div>
            <h1>All Game Collections</h1>
            {collections.map(collection => (
                <div key={collection.id}>
                    <h2>{collection.username}'s Collection</h2> {/* Adjusted to use username */}
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
}

export default AllGameCollections;