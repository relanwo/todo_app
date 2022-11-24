import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './task.css';

export default class Task extends Component {
  onValueChange = (e) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value: e.target.value,
    });
  };

  render() {
    const {
      onDeleted, onToggleEdit, onToggleDone, fieldClass, id, onSubmit, ...itemProps
    } = this.props;

    let input;
    // eslint-disable-next-line no-unused-expressions
    fieldClass === 'editing'
      ? (input = (
        <input
          type="text"
          className="edit"
          defaultValue={itemProps.text}
          onChange={this.onValueChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit(id, e.target.value);
              onToggleEdit(id);
            }
          }}
        />
      ))
      : (input = '');

    return (
      <li className={fieldClass}>
        <div className="view">
          <input className="toggle" id="temp-ide" type="checkbox" onClick={onToggleDone} />
          <label htmlFor="temp-ide">
            <span className="description">{itemProps.text}</span>
            <span className="created">
              created
              {' '}
              {itemProps.timeGone}
              {' '}
              ago
            </span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={onToggleEdit} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {input}
      </li>
    );
  }
}

Task.propTypes = {
  fieldClass: PropTypes.oneOf(['active', 'editing', 'completed']).isRequired,
  itemProps: PropTypes.arrayOf.isRequired,
  id: PropTypes.number.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
