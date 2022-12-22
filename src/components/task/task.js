import React, { Component } from 'react';

import PropTypes from 'prop-types';

import CreatedTimer from '../created-timer';
import Timer from '../timer';

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
      onDeleted, onToggleEdit, onToggleDone, fieldClass, onSubmit, ...itemProps
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
              onSubmit(itemProps.created, e.target.value);
              onToggleEdit(itemProps.created);
            }
          }}
        />
      ))
      : (input = '');

    return (
      <div className="view-wrapper">
        <div className="view">
          <input className="toggle" id="temp-ide" type="checkbox" onClick={onToggleDone} />
          <label htmlFor="temp-ide">
            <span className="title">{itemProps.text}</span>
            <Timer />
            <CreatedTimer created={itemProps.created} />
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={onToggleEdit} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {input}
      </div>
    );
  }
}

Task.propTypes = {
  fieldClass: PropTypes.oneOf(['active', 'editing', 'completed']).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
