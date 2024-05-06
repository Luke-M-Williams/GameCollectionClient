import React, { useState, useEffect } from 'react';
import { getPlatforms } from '../../managers/gameManager'; // Update the import path accordingly

const AddGame = () => {
    const [platforms, setPlatforms] = useState([]); // To store platform data
    const [selectedPlatform, setSelectedPlatform] = useState(''); // To store the selected platform ID
    const [gameTitle, setGameTitle] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch platforms
    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const platformsData = await getPlatforms();
                setPlatforms(platformsData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch platforms:', error);
                setLoading(false);
            }
        };

        fetchPlatforms();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Submit logic here
        console.log('Submitting new game:', gameTitle, selectedPlatform);
        // Typically you would send a request to the backend API to create the game
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="game-title">Game Title:</label>
            <input
                id="game-title"
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                required
            />

            <label htmlFor="platform-select">Platform:</label>
            <select
                id="platform-select"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                required
            >
                <option value="">Select a platform</option>
                {platforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
            </select>

            <button type="submit">Add Game</button>
        </form>
    );
};

export default AddGame;