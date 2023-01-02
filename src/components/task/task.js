import React, { useState } from 'react';

import PropTypes from 'prop-types';

import CreatedTimer from '../created-timer';
import Timer from '../timer';

import './task.css';

function Task({
  onDeleted, onToggleEdit, onToggleDone, fieldClass, onSubmit, startTimer, stopTimer, created, ...itemProps
}) {
  const [value, setValue] = useState('');

  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  let input;
  // eslint-disable-next-line no-unused-expressions
  fieldClass === 'editing'
    ? (input = (
      <input
        type="text"
        className="edit"
        defaultValue={itemProps.text}
        onChange={onValueChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(created, value);
            onToggleEdit(created);
          }
        }}
      />
    ))
    : (input = '');

  return (
    <div className="view-wrapper">
      <div className={`view ${fieldClass}`}>
        <input className="toggle" id="temp-ide" type="checkbox" onClick={onToggleDone} />
        <label htmlFor="temp-ide">
          <span className="title">{itemProps.text}</span>
          <Timer
            time={itemProps.time}
            pause={itemProps.pause}
            startTimer={() => startTimer(created)}
            stopTimer={() => stopTimer(created)}
          />
          <CreatedTimer created={created} />
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={onToggleEdit} />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {input}
    </div>
  );
}

Task.propTypes = {
  fieldClass: PropTypes.oneOf(['active', 'editing', 'completed']).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  created: PropTypes.number.isRequired,
};

export default Task;
