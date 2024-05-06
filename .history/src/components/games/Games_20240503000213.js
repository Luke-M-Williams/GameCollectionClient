import React, { useState, useEffect } from 'react';
import { getGames, getPlatforms } from '../../managers/gameManager';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState({});

  useEffect(() => {
    const fetchPlatforms = async () => {
      const platformsData = await getPlatforms();
      const platformMap = platformsData.reduce((map, platform) => {
        map[platform.id] = platform.name; // Adjust based on your platform object structure
        return map;
      }, {});
      setPlatforms(platformMap);
    };

    const fetchGames = async () => {
      const gamesData = await getGames();
      setGames(gamesData);
    };

    fetchPlatforms();
    fetchGames();
  }, []);

  return (
    <div>
      <h2>Game List</h2>
      <div className="game-list">
        {games.map(game => (
          <div key={game.id} className="game-item">
            <h3>{game.title}</h3>
            <img src={game.cover_art} alt={game.title} />
            <ul>
              {game.platforms.map(platformId => (
                <li key={platformId}>{platforms[platformId]}</li> // Displaying platform names
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;