import React from 'react';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const Calendar = () => (
  <div className="outer-calendar-pop-up">
    <div className="inner-calendar-pop-up">
      <div className="calendar-holder"></div>

    </div>
    <div className="calendar-footer">
      <div className="calendar-footer-content">
        <small className="fine-print">
          <div>Minimum Stay Varies</div>
          <div>Updated Today</div>
        </small>
        <div className="clear-dates-div">
          <button className="clear-dates-btn">Clear dates</button>
        </div>
      </div>
    </div>
  </div>
);

export default Calendar;
