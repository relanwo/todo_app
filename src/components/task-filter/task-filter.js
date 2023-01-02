/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import PropTypes from 'prop-types';

import './task-filter.css';

function TaskFilter({ id, filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const filterButtons = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const filterClass = isActive ? 'selected' : '';

    return (
      <div key={name} className="radio-wrapper" onClick={() => onFilterChange(name)}>
        <input
          id={id}
          type="radio"
          className={filterClass}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  });

  return <div className="filters">{filterButtons}</div>;
}

TaskFilter.propTypes = {
  id: PropTypes.string.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TaskFilter;
