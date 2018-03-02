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
    this.leftArrowClick = this.leftArrowClick.bind(this);
    this.rightArrowClick = this.rightArrowClick.bind(this);
    this.getReservationData = this.getReservationData.bind(this);
  }

  componentDidMount() {
    this.getReservationData();
  }

  componentDidUpdate() {
    this.getReservationData();
  }

  getReservationData() {
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

  leftArrowClick() {
    const now = new Date();
    if (this.state.month > now.getMonth()) {
      this.setState(prevState => ({ month: prevState.month - 1 }));
    }
  }

  rightArrowClick() {
    if (this.state.month < 11) {
      this.setState(prevState => ({ month: prevState.month + 1 }));
    }
  }

  render() {
    return (
      <div className="outer-calendar-pop-up">
        <div className="inner-calendar-pop-up">
          <div className="calendar-holder">
            {/* <div className="calendarHeader"> */}
            <button className="left-arrow" onClick={this.leftArrowClick} />
            <h4 className="calendar-header">{`${monthName[this.state.month]} ${this.state.year}`}</h4>
            <button className="right-arrow" onClick={this.rightArrowClick} />
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
              this.state.reservationData[`${this.state.month}-${this.state.year}`] === undefined ? null
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
