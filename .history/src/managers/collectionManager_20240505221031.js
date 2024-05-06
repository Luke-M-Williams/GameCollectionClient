const API_URL = 'http://localhost:8000';

function getAuthData() {
    const authData = localStorage.getItem('authData');
    return authData ? JSON.parse(authData) : null;
}

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
export const addGameToCollection = async (gameId) => {
    const response = await fetch(`${API_URL}/collection`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${authData.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ game_id: gameId })
    });
    
    if (!response.ok) {
        const errorData = await response.json();  // Assuming the server sends JSON response even on errors
        console.error("Server responded with an error:", errorData);
        throw new Error(`HTTP error! status: ${response.status}, ${errorData.message}`);
    }
    
    return await response.json();
    try {
        const response = await fetch(`${API_URL}/collection`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ game_id: gameId })
        });
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

