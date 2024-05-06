import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, updateGame, getPlatforms } from '../../managers/gameManager';

const EditGame = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({
        title: '',
        genre: '',
        developer: '',
        release_date: '',
        cover_art: '',
        platforms: []
    });
    const [allPlatforms, setAllPlatforms] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [gameData, platformsData] = await Promise.all([
                    getGame(gameId),
                    getPlatforms()
                ]);
                setGame({
                    title: gameData.title,
                    genre: gameData.genre,
                    developer: gameData.developer,
                    release_date: new Date(gameData.release_date).toISOString().slice(0, 10),
                    cover_art: gameData.cover_art,
                    platforms: gameData.platforms.map(p => p.id) // Assuming platform objects with an 'id' attribute
                });
                setAllPlatforms(platformsData); // Assuming this is an array of platform objects
            } catch (error) {
                console.error('Failed to fetch game or platforms data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setGame(prevGame => ({
                ...prevGame,
                platforms: checked
                    ? [...prevGame.platforms, parseInt(value)]
                    : prevGame.platforms.filter(id => id !== parseInt(value))
            }));
        } else {
            setGame(prevGame => ({
                ...prevGame,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!game.title || !game.genre) { // Add validation checks as needed
            alert("Please fill in all required fields.");
            return;
        }
        // Continue with submission if validation passes
        try {
            const userToken = localStorage.getItem('game_collection_user');
            const token = userToken ? JSON.parse(userToken).token : null;
            await updateGame(gameId, game, token);
            navigate(`/game/${gameId}`); // Or wherever you want to redirect after update
        } catch (error) {
            console.error('Failed to update game:', error);
            alert('Failed to update the game.');
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Game</h1>
            <form onSubmit={handleSubmit}>
            <label>
                    Title:
                    <input type="text" name="title" value={game.title} onChange={handleChange} required />
                </label>
                <br></br>
                <label>
                    Genre:
                    <input type="text" name="genre" value={game.genre} onChange={handleChange} required />
                </label>
                <br></br>
                <label>
                    Developer:
                    <input type="text" name="developer" value={game.developer} onChange={handleChange} required />
                </label>
                <br></br>
                <label>
                    Release Date:
                    <input type="date" name="release_date" value={game.release_date} onChange={handleChange} required />
                </label>
                <br></br>
                <label>
                    Cover Art URL:
                    <input type="url" name="cover_art" value={game.cover_art} onChange={handleChange} required />
                </label>
                <br></br>
                <div>
                    <h3>Platforms</h3>
                    {allPlatforms.map(platform => (
                        <label key={platform.id}>
                            <input
                                type="checkbox"
                                name="platforms"
                                value={platform.id}
                                checked={game.platforms.includes(platform.id)}
                                onChange={handleChange}
                            />
                            {platform.name}
                        </label>
                    ))}
                </div>
                <button type="submit">Update Game</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditGame;