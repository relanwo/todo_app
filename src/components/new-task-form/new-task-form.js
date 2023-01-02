import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

function NewTaskForm({ onItemAdded }) {
  const [taskInput, setTaskInput] = useState('');
  const onTaskChange = (e) => {
    setTaskInput(e.target.value);
  };

  const [minInput, setMinInput] = useState('');
  const onMinChange = (e) => {
    setMinInput(e.target.value);
  };

  const [secInput, setSecInput] = useState('');
  const onSecChange = (e) => {
    setSecInput(e.target.value);
  };

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (taskInput !== '') {
        onItemAdded(taskInput, minInput, secInput);
      }
      setTaskInput('');
      setMinInput('');
      setSecInput('');
    }
  };

  return (
    <form className="new-todo-form header">
      <input
        className="new-todo"
        onChange={onTaskChange}
        onKeyDown={onSubmit}
        placeholder="What needs to be done?"
        value={taskInput}
      />
      <input
        className="new-todo-form__timer"
        onChange={onMinChange}
        onKeyDown={onSubmit}
        placeholder="Min"
        value={minInput}
      />
      <input
        className="new-todo-form__timer"
        onChange={onSecChange}
        onKeyDown={onSubmit}
        placeholder="Sec"
        value={secInput}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};

export default NewTaskForm;
