import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter';

function Footer({
  toDo, onCompletedDeleted, filter, onFilterChange,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {toDo}
        {' '}
        items left
      </span>
      <TaskFilter id={toDo.created} filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" aria-label="button" onClick={onCompletedDeleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  toDo: PropTypes.number.isRequired,
  onCompletedDeleted: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Footer;
