/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './task-filter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { id, filter, onFilterChange } = this.props;

    const filterButtons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const filterClass = isActive ? 'selected' : '';

      return (
        <div key={name} className="radio-wrapper" onClick={() => onFilterChange(name)}>
          <input
            // value={label}
            id={id}
            type="radio"
            className={filterClass}
          />
          <label htmlFor={id}>{label}</label>
          {/* {label}
          </input> */}
        </div>
      );
    });

    return <div className="filters">{filterButtons}</div>;
  }
}

TaskFilter.propTypes = {
  id: PropTypes.string.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
