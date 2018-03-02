import React from 'react';
import axios from 'axios';
import CalendarGrid from './calendarGrid';
import monthName from '../../data/reservationDataObj';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

class Calendar extends React.Component {
  constructor() {
    super();
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    this.state = {
      month,
      year,
      reservationData: {},
      // currentMonthData: null,
    };
  }

  componentDidMount() {
    //  look at current month and year
    //  check to see if data is in reservation data already
    //  if not make a call to server for it
    //  Set state in the then of the server call
    //  if the data is already there then just set state of current month to that month
    if (this.state.reservationData[`${this.state.month}-${this.state.year}`] === undefined) {
      axios.get('/1', { params: { month: this.state.month + 1, year: this.state.year } })
        .then((response) => {
          this.setState((prevState) => {
            const nextReservationData = prevState.reservationData;
            nextReservationData[`${this.state.month}-${this.state.year}`] = response.data;
            return { reservationData: nextReservationData };
          });
        });
    }
  }

  render() {
    return (
      <div className="outer-calendar-pop-up">
        <div className="inner-calendar-pop-up">
          <div className="calendar-holder">
            {/* <div className="calendarHeader"> */}
            <button className="left-arrow" />
            <h4 className="calendar-header">{`${monthName[this.state.month]} ${this.state.year}`}</h4>
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
            {
              this.state.reservationData[`${this.state.month}-${this.state.year}`] === undefined ? <p>Loading Reservation Data</p>
              : <CalendarGrid reservationData={this.state.reservationData[`${this.state.month}-${this.state.year}`]} />
            }
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
  }
}

export default Calendar;
