import React, { useState, useEffect } from 'react';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/all-collections', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setCollections(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching all collections:', error);
            setError(error.message);
            setLoading(false);
        });
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
                        {collection.games.map(game => (
                            <li key={game.id}>{game.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AllGameCollections;