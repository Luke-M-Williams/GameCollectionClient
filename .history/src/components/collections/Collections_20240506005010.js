import React, { useState, useEffect } from 'react';

const AllGameCollections = () => {
    const [collections, setCollections] = useState([]);
  
    useEffect(() => {
        fetch('http://localhost:8000/all-collections', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);  // Check the structure here
            setCollections(data);
          })
          .catch(error => console.error('Error fetching all collections:', error));
    }, []);
  
    return (
      <div>
        <h1>All Game Collections</h1>
        {collections.map(collection => (
          <div key={collection.id}>
            <h2>{collection.user.username}'s Collection</h2>
            <ul>
              {collection.game.map(game => (
                <li key={game.id}>{game.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default AllGameCollections;