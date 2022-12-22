import React, { Component } from 'react';

import { format } from 'date-fns';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 0,
      isCounting: false,
    };
  }

  start = (prevState) => {
    const { isCounting } = this.state;
    if (isCounting !== prevState.isCounting) {
      this.setState({ isCounting: true });
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  };

  stop = () => {
    clearInterval(this.timerID);
    this.setState({ isCounting: false });
  };

  tick() {
    this.setState(({ date }) => ({
      date: date + 1000,
    }));
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { date, isCounting } = this.state;

    return (
      <span className="description">
        {isCounting ? (
          <button
            type="button"
            className="icon icon-pause"
            aria-label="pause"
            onClick={this.stop}
          />
        ) : (
          <button
            type="button"
            className="icon icon-play"
            aria-label="play"
            onClick={this.start}
          />
        )}
        {format(new Date(date), 'mm:ss')}
      </span>
    );
  }
}

// Timer.propTypes = {
//   // created: PropTypes.number.isRequired,
// };
