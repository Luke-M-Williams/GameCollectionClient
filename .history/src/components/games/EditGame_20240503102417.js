import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, updateGame } from '../../managers/gameManager';

const EditGame = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState({
        title: '',
        genre: '',
        developer: '',
        release_date: '',
        cover_art: '',
    });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true);
                const gameData = await getGame(gameId);
                setGame({
                    title: gameData.title,
                    genre: gameData.genre,
                    developer: gameData.developer,
                    release_date: new Date(gameData.release_date).toISOString().slice(0, 10), // Format date for input[type="date"]
                    cover_art: gameData.cover_art,
                });
            } catch (error) {
                console.error('Failed to fetch game details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame(prevGame => ({
            ...prevGame,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('game_collection_user');
        const token = userToken ? JSON.parse(userToken).token : null;

        try {
            await updateGame(gameId, game, token);
            navigate('/'); // Redirect to the home page or to the game details page
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
                <label>
                    Genre:
                    <input type="text" name="genre" value={game.genre} onChange={handleChange} required />
                </label>
                <label>
                    Developer:
                    <input type="text" name="developer" value={game.developer} onChange={handleChange} required />
                </label>
                <label>
                    Release Date:
                    <input type="date" name="release_date" value={game.release_date} onChange={handleChange} required />
                </label>
                <label>
                    Cover Art URL:
                    <input type="url" name="cover_art" value={game.cover_art} onChange={handleChange} required />
                </label>
                <button type="submit">Update Game</button>
            </form>
        </div>
    );
};

export default EditGame;