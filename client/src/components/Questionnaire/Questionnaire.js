import React, { useState } from 'react';
import axios from 'axios';
import './Questionnaire.css';

function Questionnaire() {
  const [formData, setFormData] = useState({
    ageGroup: '',
    interests: '',
    occasion: '',
    // Add additional questions as needed
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the form data to your API to get recommendations
      await axios.post('/api/recommendations', formData);
      // Handle subsequent actions like redirecting to recommendations page
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit questionnaire', err);
      // Implement user-friendly error handling here
    }
  };

  return (
    <div className="questionnaire">
      <h2>Find the Perfect Gift!</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ageGroup">Age Group:</label>
            <select name="ageGroup" onChange={handleChange} required>
              <option value="">Select Age Group</option>
              <option value="children">Children</option>
              <option value="teens">Teens</option>
              <option value="adults">Adults</option>
              {/* Add more options as per requirement */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="interests">Interests:</label>
            <input
              type="text"
              name="interests"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="occasion">Occasion:</label>
            <select name="occasion" onChange={handleChange} required>
              <option value="">Select Occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              {/* Add more options as per requirement */}
            </select>
          </div>
          {/* Add more questions as per requirement */}
          <button type="submit">Find Recommendations</button>
        </form>
      ) : (
        <p>Thank you for submitting! Checking for recommendations...</p>
        // Optionally, redirect or update UI to display recommendations
      )}
    </div>
  );
}

export default Questionnaire;
