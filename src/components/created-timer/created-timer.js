import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { formatDistance } from 'date-fns';

export default class CreatedTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const {
      created,
    } = this.props;
    const { date } = this.state;

    return (
      <span className="description">
        {`created ${formatDistance(date, Number(created))} ago`}
      </span>
    );
  }
}

CreatedTimer.propTypes = {
  created: PropTypes.string.isRequired,
};
