/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';

import Task from '../task';
import './task-list.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends Component {
  render() {
    const {
      todos, filter, onDeleted, onToggleEdit, onToggleDone, onSubmit, start, stop, startTimer, stopTimer,
    } = this.props;

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
      // fieldClass: PropTypes.oneOf(['active', 'editing', 'completed']),
      created: PropTypes.string,
      timeGone: PropTypes.string,
      // id: PropTypes.number,
    }),
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  onSubmit: PropTypes.func,
};
