import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';

import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      10000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onValueChange = (e) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value: e.target.value,
    });
  };

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const {
      onDeleted, onToggleEdit, onToggleDone, fieldClass, onSubmit, ...itemProps
    } = this.props;
    const { date } = this.state;

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
            <span className="description">{itemProps.text}</span>
            <span className="created">
              created
              {' '}
              {formatDistance(date, Number(itemProps.created))}
              {' '}
              ago
            </span>
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
  // itemProps: PropTypes.arrayOf.isRequired,
  // id: PropTypes.number.isRequired,
  // id: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
