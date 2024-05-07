import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../../managers/gameManager';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);
  
    return (
      <div className="games-container">
        <h1 className="games-title">All Games</h1>
        <div className="game-list">
          {games.map(game => (
            <Link key={game.id} to={`/game/${game.id}`} className="game-item-link">
              <div className="game-item">
                <img src={game.cover_art} alt={game.title} className="game-image" />
                <h3 className="game-title">{game.title}</h3>
                <p className="game-info">Genre: {game.genre}</p>
                <p className="game-info">Developer: {game.developer}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
  export default Games;

  