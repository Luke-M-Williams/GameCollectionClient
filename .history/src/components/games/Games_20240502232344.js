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