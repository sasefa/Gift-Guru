import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendationItem from './RecommendationItem';

function RecommendationList() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching gift recommendations from API
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/api/recommendations');
        setRecommendations(response.data);
      } catch (err) {
        setError('Something went wrong! Unable to fetch recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // JSX to render
  return (
    <div className="recommendation-list">
      <h2>Gift Recommendations</h2>
      {loading && <p>Loading recommendations...</p>}
      {error && <p className="error">{error}</p>}
      {recommendations.length > 0 && !loading && (
        <ul>
          {recommendations.map(recommendation => (
            <RecommendationItem key={recommendation._id} recommendation={recommendation} />
          ))}
        </ul>
      )}
      {!loading && recommendations.length === 0 && (
        <p>No recommendations found!</p>
      )}
    </div>
  );
}

export default RecommendationList;
