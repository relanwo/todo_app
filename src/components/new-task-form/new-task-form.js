import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: '',
      minInput: '',
      secInput: '',
    };
  }

  onTaskChange = (e) => {
    this.setState({
      taskInput: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      minInput: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      secInput: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { taskInput, minInput, secInput } = this.state;
    const { onItemAdded } = this.props;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (taskInput !== '') {
        onItemAdded(taskInput, minInput, secInput);
      }
      this.setState({
        taskInput: '',
        minInput: '',
        secInput: '',
      });
    }
  };

  render() {
    const { taskInput, minInput, secInput } = this.state;
    return (
      // <header className="header">
      <form className="new-todo-form header">
        <input
          className="new-todo"
          onChange={this.onTaskChange}
          onKeyDown={this.onSubmit}
          placeholder="What needs to be done?"
          value={taskInput}
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onMinChange}
          onKeyDown={this.onSubmit}
          placeholder="Min"
          value={minInput}
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onSecChange}
          onKeyDown={this.onSubmit}
          placeholder="Sec"
          value={secInput}
        />
      </form>
      // {/* </header> */}
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
