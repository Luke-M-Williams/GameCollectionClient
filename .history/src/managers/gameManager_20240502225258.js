const API_URL = 'http://localhost:8000'; // Adjust this URL based on your actual API URL

export const addGame = async (gameData, token) => {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(gameData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } 
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Error adding game:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const getGames = async () => {
  try {
    const token = localStorage.getItem('game_collection_user')
      ? JSON.parse(localStorage.getItem('game_collection_user')).token
      : null;

    const response = await fetch(`${API_URL}/game`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Add this line to log the response data
    return data.results;
  } catch (error) {
    console.error("Error getting games:", error);
    throw error;
  }
}

export const getGame = async (gameId) => {
  try {
    const token = localStorage.getItem('game_collection_user')
      ? JSON.parse(localStorage.getItem('game_collection_user')).token
      : null;

    const response = await fetch(`${API_URL}/game/${gameId}`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Verify the structure here
    return data; // If 'data' directly contains the game info, use this line
  } catch (error) {
    console.error("Error getting game:", error);
    throw error;
  }
}

export const updateGame = async (gameId, gameData, token) => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(gameData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Error updating game:", error);
    throw error; // Re-throw to handle it in the component
  }
}

export const deleteGame = async (gameId, token) => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error; // Re-throw to handle it in the component
  }
}

export const getPlatforms = async () => {
    try {
      const response = await fetch(`${API_URL}/platforms/`);  // Ensure correct endpoint
      const data = await response.json();
      return data;  // Ensure this is the expected array
    } catch (error) {
      console.error("Error getting platforms:", error);
      throw error;  // Ensure errors are caught
    }
  };
