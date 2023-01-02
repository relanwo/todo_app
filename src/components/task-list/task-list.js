import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

function TaskList({
  todos, onDeleted, onToggleEdit, onToggleDone, onSubmit, startTimer, stopTimer,
}) {
  const elements = todos.map((item) => {
    const { created, ...itemProps } = item;
    return (
      <li key={created} className={itemProps.fieldClass}>
        <Task
          created={created}
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...itemProps}
          onDeleted={() => onDeleted(created)}
          onToggleEdit={() => onToggleEdit(created)}
          onToggleDone={() => onToggleDone(created)}
          onSubmit={onSubmit}
          startTimer={() => startTimer(created)}
          stopTimer={() => stopTimer(created)}
        />
      </li>
    );
  });
  return (<ul className="todo-list">{elements}</ul>);
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleEdit: () => {},
  onToggleDone: () => {},
  onSubmit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      created: PropTypes.string,
      timeGone: PropTypes.string,
    }),
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  onSubmit: PropTypes.func,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default TaskList;
