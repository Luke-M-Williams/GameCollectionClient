import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';  
import { getGames } from '../../managers/gameManager';
import './Games.css';


const GameList = () => {
    const [games, setGames] = useState([]);
  
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const gamesData = await getGames();
          if (Array.isArray(gamesData)) { // Check if gamesData is an array
            setGames(gamesData);
          } else {
            console.error('Expected gamesData to be an array, but got:', typeof gamesData);
            setGames([]); // Set games to an empty array if not an array
          }
        } catch (error) {
          console.error('Failed to fetch games:', error);
        }
      };
  
      fetchGames();
    }, []);
  
    return (
      <div className="games-container">
        <h1 className="games-title">All Games</h1>
        <div className="game-list">
          {games.map(game => (
            <div key={game.id} className="game-item">
              <img src={game.cover_art} alt={game.title} className="game-image" />
              <h3 className="game-title">{game.title}</h3>
              <p className="game-info">Genre: {game.genre}</p>
              <p className="game-info">Developer: {game.developer}</p>
            </div>
          ))}
        </div>
      </div>
    )
  };
  
  export default GameList;