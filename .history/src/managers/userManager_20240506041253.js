const apiURL = "http://localhost:8000"

export const register_user = async (user) => {
    console.log("Sending user data:", user);
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${apiURL}/register/`, postOptions);
        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Registration error:", errorText);
            throw new Error("Registration failed. Please try again.");
        }

        const data = await response.json();
        console.log("Received response:", data);
        return data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}


export const login_user = async (username, password) => {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), 
    };
  
    const response = await fetch(`${apiURL}/login/`, postOptions);
    return await response.json();
  };

  export const fetchUserById = async (userId, token) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
};