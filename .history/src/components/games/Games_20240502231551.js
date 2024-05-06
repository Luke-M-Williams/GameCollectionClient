import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../../managers/gameManager';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h2>Game List</h2>
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-item">
            <Link to={`/game/${game.id}`}>
                <img src={game.cover_art} alt={game.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;