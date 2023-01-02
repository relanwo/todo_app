import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { formatDistance } from 'date-fns';

function CreatedTimer({ created }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval((() => setDate(new Date())), 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <span className="description">
      {`created ${formatDistance(date, Number(created))} ago`}
    </span>
  );
}

CreatedTimer.propTypes = {
  created: PropTypes.string.isRequired,
};

export default CreatedTimer;
