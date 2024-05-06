import React, { useState, useEffect } from 'react';
import { getGames } from '../../path/to/your/gameManager'; // Make sure the path is correct

export const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData); // gamesData should now correctly be an array
      } catch (error) {
        console.error('Failed to fetch games:', error);
        setGames([]); // Set to empty array in case of error
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
            {/* Example of how you might render each game */}
            <h3>{game.title}</h3>
            <img src={game.cover_art} alt={game.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;