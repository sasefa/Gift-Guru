import React, { useState } from 'react';
import axios from 'axios';
import Question from './Question';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    ageGroup: '',
    interests: '',
    occasion: '',
    relationship: '',
    personality: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]); 

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
      const res = await axios.post('/api/recommendations/v1/generate', formData);
      if (res.status === 200) {
                setRecommendations(res.data.data); 
        setSubmitted(true);
        console.log (res);
      } else {
        console.error(`Received status code of ${res.status}. Expected 200.`);
      }   
    } catch (err) {
      console.error('Failed to submit questionnaire', err);
    }
  };


  return (
    <div className="questionnaire">
      <h2>Find the Perfect Gift!</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <hr />
          {/* Additional Questionss */}
          <Question
            question="Relationship:"
            name="relationship"
            options={[
              { label: "Select Relation", value: "" },
              { label: "Family", value: "family" },
              { label: "Friend", value: "friend" },
              { label: "Colleague", value: "colleague" },
              { label: "Partner", value: "partner" },
            ]}
            handleChange={handleChange}
            value={formData.relationship || ''}
          />
          <Question
            question="Personality Traits:"
            name="personality"
            handleChange={handleChange}
            value={formData.personality || ''}
          />
          <Question
            question="Budget:"
            name="budget"
            options={[
              { label: "Select Budget", value: "" },
              { label: "Under $25", value: "under_25" },
              { label: "$25 - $50", value: "25_50" },
              { label: "$50 - $100", value: "50_100" },
              { label: "$100 and above", value: "100_above" },
            ]}
            handleChange={handleChange}
            value={formData.budget || ''}
          />
          <hr />
          <button type="submit">Find Recommendations</button>
        </form>
     ) : (
      <div>
         <p>Thank you for submitting! Here are some recommendations for you:</p>
            <ul>
              {recommendations && recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
};
export default Questionnaire;
