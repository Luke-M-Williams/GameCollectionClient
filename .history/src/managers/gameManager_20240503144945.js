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
  const userToken = localStorage.getItem('game_collection_user');
  const token = userToken ? JSON.parse(userToken).token : null;

  try {
    const response = await fetch(`${API_URL}/game`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Assuming the token needs to be prefixed with 'Token'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && Array.isArray(data.results)) {
      return data.results; // Return only the results array
    } else {
      console.error('Expected data.results to be an array, received:', data);
      return []; // Return an empty array if no results or unexpected format
    }
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

    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;  // Adjust if your backend expects a different scheme, e.g., 'Bearer'
    }

    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();  // Parse JSON response
  } catch (error) {
    console.error("Error getting game:", error);
    throw error;  // Re-throw to handle it in the component
  }
};

export const updateGame = async (gameId, gameData, token) => { 
  console.log("gameData", gameData)
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
     
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
        'X-CSRFToken': getCookie('csrftoken') // Add the CSRF token here
      },
      body: JSON.stringify(gameData)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Error updating game:", error);
    throw error; // Re-throw to handle it in the component
  }
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const handleDelete = async () => {
  const userToken = localStorage.getItem('game_collection_user');
  const token = userToken ? JSON.parse(userToken).token : null;

  try {
    const result = await deleteGame(gameId, token);
    console.log(result); // Log or use the result if needed
    navigate('/');  // Redirect to the home page or list page after deletion
  } catch (error) {
    console.error('Failed to delete game:', error);
    alert('Failed to delete the game.');
  }
};



export const getPlatforms = async () => {
  const token = localStorage.getItem('game_collection_user') ? JSON.parse(localStorage.getItem('game_collection_user')).token : null;
  
  try {
    const response = await fetch(`${API_URL}/platforms`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results; // Return just the results array containing the platforms
  } catch (error) {
    console.error("Error getting platforms:", error);
    throw error;
  }
}

export const getPlatformList = async () => {
  const token = localStorage.getItem('game_collection_user') ? JSON.parse(localStorage.getItem('game_collection_user')).token : null;
  
  try {
    const response = await fetch(`${API_URL}/platforms`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // This should return an array directly
  } catch (error) {
    console.error("Error getting platforms:", error);
    throw error;
  }
}