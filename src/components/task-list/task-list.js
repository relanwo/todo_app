import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

function TaskList({
  todos, onDeleted, onToggleEdit, onToggleDone, onSubmit,
}) {
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
        fieldClass: PropTypes.oneOf(['active', 'editing', 'completed']),
        created: PropTypes.string,
        timeGone: PropTypes.string,
        id: PropTypes.number,
      }),
    ).isRequired,
    onDeleted: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onToggleDone={() => onToggleDone(id)}
        onSubmit={onSubmit}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
