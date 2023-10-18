import React from 'react';
import PropTypes from 'prop-types';

function RecommendationItem({ recommendation }) {
  return (
    <li className="recommendation-item">
      <h3>{recommendation.name}</h3>
      <p>{recommendation.description}</p>
      <img 
        src={recommendation.imageUrl} 
        alt={recommendation.name} 
        className="recommendation-image"
      />
      <p>Price: ${recommendation.price}</p>
      {/* Additional details and structured UI components would go here */}
      <a href={recommendation.link} target="_blank" rel="noopener noreferrer">
        Check it Out
      </a>
    </li>
  );
}

// Prop-types checking
RecommendationItem.propTypes = {
  recommendation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendationItem;
