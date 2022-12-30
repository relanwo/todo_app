/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import { format, parseISO } from 'date-fns';
// import { TimerContextConsumer } from '../timer-context/timer-context';

export default class Timer extends Component {
  render() {
    const {
      time, startTimer, stopTimer,
    } = this.props;

    return (
    // <TimerContextConsumer>
    //   {(timerArr) => {
    //     console.log(timerArr);
    //     return (
      <span className="description">
        {/* {pause ? ( */}
        <button
          type="button"
          className="icon icon-play"
          aria-label="play"
            // onClick={start}
          onClick={startTimer}
        />
        <button
          type="button"
          className="icon icon-pause"
          aria-label="pause"
            // onClick={stop}
          onClick={stopTimer}
        />
        {/* ) : ( */}

        {/* )} */}
        {` ${format(new Date(time), 'mm:ss')}`}
      </span>
    //     );
    //   }}
    // </TimerContextConsumer>
    );
  }
}

// Timer.propTypes = {
//   // created: PropTypes.number.isRequired,
// min:
// };
