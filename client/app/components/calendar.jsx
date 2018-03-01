import React from 'react';
import CalendarGrid from './calendarGrid';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const Calendar = () => (
  <div className="outer-calendar-pop-up">
    <div className="inner-calendar-pop-up">
      <div className="calendar-holder">
        {/* <div className="calendarHeader"> */}
        <button className="left-arrow" />
        <h4 className="calendar-header">January 2018</h4>
        <button className="right-arrow" />
        {/* </div> */}
        <div className="days-of-week-div">
          <ul className="days">
            <li className="day"><small>Su</small></li>
            <li className="day"><small>Mo</small></li>
            <li className="day"><small>Tu</small></li>
            <li className="day"><small>We</small></li>
            <li className="day"><small>Th</small></li>
            <li className="day"><small>Fr</small></li>
            <li className="day"><small>Sa</small></li>
          </ul>
        </div>
        <CalendarGrid />
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
  </div>
);

export default Calendar;
