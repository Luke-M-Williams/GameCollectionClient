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

export const getGame = async (gameId) => { // Fetch a single game
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
    console.log(data); // Add this line to log the response data
    return data.results;
  } catch (error) {
    console.error("Error getting games:", error);
    throw error;
  }
}
export const getGame = async (gameId) => { // Fetch a single game
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Error getting game:", error);
    throw error; // Re-throw to handle it in the component
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
    const token = localStorage.getItem('game_collection_user')
      ? JSON.parse(localStorage.getItem('game_collection_user')).token
      : null;

    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(`${API_URL}/platforms`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;  // Ensure this returns the expected array or handle accordingly
  } catch (error) {
    console.error("Error getting platforms:", error);
    throw error;  // This will log the error which might give clues
  }
};