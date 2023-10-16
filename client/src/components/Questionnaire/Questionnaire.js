import React, { useState } from 'react';
import axios from 'axios';
import Question from './Question'; // import the Question component

const Questionnaire = () => {
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
          <Question 
              question="Age Group:"
              name="ageGroup"
              options={[
                  {label: "Select Age Group", value: ""},
                  {label: "Children", value: "children"},
                  {label: "Teens", value: "teens"},
                  {label: "Adults", value: "adults"}
              ]}
              handleChange={handleChange}
              value={formData.ageGroup || ''}
          />
          <Question 
              question="Interests:"
              name="interests"
              handleChange={handleChange}
              value={formData.interests || ''}
          />
          <Question 
              question="Occasion:"
              name="occasion"
              options={[
                  {label: "Select Occasion", value: ""},
                  {label: "Birthday", value: "birthday"},
                  {label: "Anniversary", value: "anniversary"}
              ]}
              handleChange={handleChange}
              value={formData.occasion || ''}
          />
          {/* Add more questions using the Question Component */}
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
