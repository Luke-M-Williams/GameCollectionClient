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

const getGames = async () => {
  const userToken = localStorage.getItem('game_collection_user');
  const token = userToken ? JSON.parse(userToken).token : null;

  try {
    const response = await fetch(`${API_URL}/game`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Getting the full JSON response
    console.log('Received games data:', data); // Log to see the structure
    return data;
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