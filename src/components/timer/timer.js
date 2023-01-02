import React from 'react';

import PropTypes from 'prop-types';

import { format } from 'date-fns';

function Timer({
  time, pause, startTimer, stopTimer,
}) {
  return (
  // <TimerContextConsumer>
  //   {(timerArr) => {
  //     console.log(timerArr);
  //     return (
    <span className="description">
      {pause ? (
        <button
          type="button"
          className="icon icon-play"
          aria-label="play"
          onClick={startTimer}
        />
      )
        : (
          <button
            type="button"
            className="icon icon-pause"
            aria-label="pause"
            onClick={stopTimer}
          />
        )}
      {` ${format(new Date(time), 'mm:ss')}`}
    </span>
  //     );
  //   }}
  // </TimerContextConsumer>
  );
  // }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  pause: PropTypes.bool.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default Timer;
