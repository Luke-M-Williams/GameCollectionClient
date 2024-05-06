import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGame } from '../../managers/gameManager';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await getGame(gameId);
        setGame(gameData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch game details:', error);
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>{game.title}</h2>
      <img src={game.cover_art} alt={game.title} />
      <p>Genre: {game.genre}</p>
      <p>Developer: {game.developer}</p>
      <p>Release Date: {game.release_date}</p>
      <p>Platforms:</p>
      <ul>
        {game.platforms.map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameDetails;