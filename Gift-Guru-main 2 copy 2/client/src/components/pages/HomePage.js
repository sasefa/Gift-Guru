import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to GiftGenius!</h1>
      <p>Your one-stop solution for all your gifting needs.</p>
      <Link to="/questionnaire">
        <button type="button">Get Started</button>
      </Link>
    </div>
  );
}

export default HomePage;
