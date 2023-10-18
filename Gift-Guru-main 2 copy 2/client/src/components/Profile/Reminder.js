import React from 'react';
import PropTypes from 'prop-types';

function Reminder({ title, date, notes, onEdit, onDelete }) {
  return (
    <div className="reminder">
      <h3>{title}</h3>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      {notes && (
        <p>
          <strong>Notes:</strong> {notes}
        </p>
      )}
      <button onClick={onEdit} className="edit-btn">
        Edit
      </button>
      <button onClick={onDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
}

// PropTypes for component validation
Reminder.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  notes: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Reminder;
