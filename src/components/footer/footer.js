import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter';

function Footer({
  toDo, onCompletedDeleted, filter, onFilterChange,
}) {
  Footer.propTypes = {
    toDo: PropTypes.number,
    onCompletedDeleted: PropTypes.func,
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {toDo}
        {' '}
        items left
      </span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onCompletedDeleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
