import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onLabelChange: () => {},
    onSubmit: () => {},
  };

  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.state.label !== '') {
        this.props.onItemAdded(this.state.label);
      }
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          onKeyDown={this.onSubmit}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
        />
      </header>
    );
  }
}
