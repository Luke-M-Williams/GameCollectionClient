import React, { useState, useEffect } from 'react';

export default const AllUsersCollections = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/users', {
          headers: {
            'Content-Type': 'application/json',
            
            'Authorization': `Token ${localStorage.getItem('yourTokenKey')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Users' Collections</h1>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <ul>
            {user.collections.map(collection => (
              <li key={collection.id}>
                {collection.game.title} - Owned by {user.username}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllUsersCollections;