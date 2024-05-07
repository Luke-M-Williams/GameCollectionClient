import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGame, updateGame, getPlatforms } from '../../managers/gameManager';
import './EditGame.css';

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
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [gameData, platformsData] = await Promise.all([
                    getGame(gameId),
                    getPlatforms()
                ]);
            if (platformsData && Array.isArray(platformsData)) { // Check if platformsData is an array
              setAvailablePlatforms(platformsData);
            } else {
              console.error("Fetched platforms data is not an array:", platformsData);
              setAvailablePlatforms([]); // Set to empty array if no valid data is found
            }
            setGame({
              title: gameData.title,
              genre: gameData.genre,
              developer: gameData.developer,
              release_date: new Date(gameData.release_date).toISOString().slice(0, 10),
              cover_art: gameData.cover_art,
              platforms: gameData.platforms
            });
            console.log("Fetched game data:", gameData)
          } catch (error) {
            console.error('Failed to fetch game or platforms data:', error);
            setAvailablePlatforms([]); // Ensure the state is set to an empty array on error
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
        if (!game.title || !game.genre) {
          alert("Please fill in all required fields.");
          return;
        }
      
        // Include the platforms array in the gameData object
        const gameData = {
          ...game,
          release_date: game.release_date, // Convert to string if needed
          platforms: game.platforms,
        };
      
        try {
          const userToken = localStorage.getItem('game_collection_user');
          const token = userToken ? JSON.parse(userToken).token : null;
          await updateGame(gameId, gameData, token);
          navigate(`/game/${gameId}`);
        } catch (error) {
          console.error('Failed to update game:', error);
          alert('Failed to update the game.');
        }
      };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="edit-game-container">
          <h1 className="edit-game-title">Edit Game</h1>
          <form onSubmit={handleSubmit} className="edit-game-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" id="title" name="title" value={game.title} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="genre" className="form-label">Genre:</label>
              <input type="text" id="genre" name="genre" value={game.genre} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="developer" className="form-label">Developer:</label>
              <input type="text" id="developer" name="developer" value={game.developer} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="release_date" className="form-label">Release Date:</label>
              <input type="date" id="release_date" name="release_date" value={game.release_date} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="cover_art" className="form-label">Cover Art URL:</label>
              <input type="url" id="cover_art" name="cover_art" value={game.cover_art} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <h3>Platforms</h3>
              <div className="platform-group">
                {availablePlatforms.map(platform => (
                  <div key={platform.id}>
                    <input
                      type="checkbox"
                      id={`platform-${platform.id}`}
                      name="platforms"
                      value={platform.id}
                      checked={game.platforms.includes(platform.id)}
                      onChange={handleChange}
                      className="platform-checkbox"
                    />
                    <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="submit-button">Update Game</button>
            <button type="button" onClick={() => navigate(-1)} className="cancel-button">Cancel</button>
          </form>
        </div>
      );
    };
    
    export default EditGame