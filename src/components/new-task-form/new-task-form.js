import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label } = this.state;
    const { onItemAdded } = this.props;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (label !== '') {
        onItemAdded(label);
      }
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          onKeyDown={this.onSubmit}
          placeholder="What needs to be done?"
          value={label}
        />
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
