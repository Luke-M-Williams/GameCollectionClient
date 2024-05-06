const API_URL = 'http://localhost:8000';

// Fetch user's game collection
export const fetchUserCollection = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/collection`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user collection:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Add a game to the collection
export const addGameToCollection = async (gameId, token) => {
    console.log("Token used:", token);  // Debug: Log the token to ensure it's passed correctly
    try {
      const response = await fetch(`${API_URL}/collection`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ game_id: gameId })
      });
      console.log("Headers sent:", JSON.stringify({
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }));
      console.log("Response:", response);  // Debug: Log the response to see what the server is returning
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding game to collection:", error);
      throw error;
    }
  };

// Remove a game from the collection
export const removeGameFromCollection = async (userId, gameId, token) => {
  try {
    const response = await fetch(`${API_URL}/collection/remove/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.ok; // Typically, DELETE might not return a JSON body, just a status
  } catch (error) {
    console.error("Error removing game from collection:", error);
    throw error;
  }
};

