import React, { Component } from 'react';

// import PropTypes from 'prop-types';

import { format } from 'date-fns';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 0,
    };
  }

  start() {
    // this.tick();
    // eslint-disable-next-line react/destructuring-assignment, no-console
    // console.log(this.state.date);
    this.timerID = setInterval(async () => this.tick(), 1000);
  }

  // componentDidUpdate() {
  //   this.timerID = setInterval(async () => this.tick(), 1000);
  // }

  finish() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(({ date }) => ({
      date: date + 1000,
    }));
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { date } = this.state;

    return (
      <span className="description">
        <button
          className="icon icon-play"
          type="button"
          aria-label="play"
          // eslint-disable-next-line no-console
          // onClick={console.log('hi')}
          onClick={this.start}
        />
        <button
          className="icon icon-pause"
          type="button"
          aria-label="pause"
          // eslint-disable-next-line no-console
          // onClick={console.log('bye')}
          onClick={this.finish}
        />
        {format(new Date(date), 'mm:ss')}
      </span>
    );
  }
}

// Timer.propTypes = {
//   // created: PropTypes.number.isRequired,
// };
