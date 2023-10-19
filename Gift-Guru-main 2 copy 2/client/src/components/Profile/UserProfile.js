import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [userProfile, setUserProfile] = useState({
    name: '',
    avatarUrl: '',
    favoriteItems: [],
    // other user details...
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserProfile(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile. Please try again later.');
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div className="user-profile">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <img src={userProfile.avatarUrl} alt={`${userProfile.name}'s avatar`} className="avatar" />
          <h2>{userProfile.name}</h2>
          <h3>Favorite Items:</h3>
          <ul>
            {userProfile.favoriteItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          {/* Additional user details... */}
        </>
      )}
    </div>
  );
}

export default UserProfile;
