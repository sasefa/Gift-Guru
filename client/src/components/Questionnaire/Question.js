import React from 'react';
import PropTypes from 'prop-types';

function Question({ question, options, name, handleChange, value }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{question}</label>
      {options ? (
        <select name={name} id={name} onChange={handleChange} value={value} required>
          <option value="" disabled>
            Select
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          onChange={handleChange}
          value={value}
          required
        />
      )}
    </div>
  );
}

// Prop-Types validation
Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Question;
