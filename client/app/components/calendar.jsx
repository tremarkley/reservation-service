import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import dateShape from '../../data/propShapes';
import obj from './calendarGrid';
import monthName from '../../data/months';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const { CalendarGrid } = obj;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let month;
    let year;
    if (props.dates.checkInDate !== undefined) {
      month = props.dates.checkInDate.month - 1;
      ({ year } = props.dates.checkInDate);
    } else if (props.dates.checkOutDate !== undefined) {
      month = props.dates.checkOutDate.month - 1;
      ({ year } = props.dates.checkOutDate);
    } else {
      const now = new Date();
      month = now.getMonth();
      year = now.getFullYear();
    }
    this.state = {
      month,
      year,
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
    if (this.props.reservationData[`${this.state.month}-${this.state.year}`] === undefined) {
      axios.get('/1', { params: { month: this.state.month + 1, year: this.state.year } })
        .then((response) => {
          this.props.updateReservationData(response.data, this.state.month, this.state.year);
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
    let lastDayPreviousMonth;
    const previousMonth = this.props.reservationData[`${this.state.month - 1}-${this.state.year}`];
    if (previousMonth !== undefined) {
      lastDayPreviousMonth = previousMonth[previousMonth.length - 1];
    }
    return (
      <div className="outer-calendar-pop-up">
        <div className="inner-calendar-pop-up">
          <div className="calendar-holder">
            <button className="left-arrow" onClick={this.leftArrowClick} />
            <h4 className="calendar-header">{`${monthName.long[this.state.month]} ${this.state.year}`}</h4>
            <button className="right-arrow" onClick={this.rightArrowClick} />
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
              this.props.reservationData[`${this.state.month}-${this.state.year}`] === undefined ? null
              : <CalendarGrid reservationData={this.props.reservationData[`${this.state.month}-${this.state.year}`]} onDateClick={this.props.onClick} dates={this.props.dates} checkInActive={this.props.checkInActive} lastDayPreviousMonth={lastDayPreviousMonth} />
            }
          </div>
          <div className="calendar-footer">
            <div className="calendar-footer-content">
              <small className="fine-print">
                <div>Minimum Stay Varies</div>
                <div>Updated Today</div>
              </small>
              {
                this.props.dates.checkInDate || this.props.dates.checkOutDate ?
                  <div className="clear-dates-div">
                    <button
                      className="clear-dates-btn"
                      onClick={this.props.handleClearDates}
                    >
                    Clear dates
                    </button>
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  onClick: PropTypes.func.isRequired,
  dates: PropTypes.shape({
    checkInDate: dateShape,
    checkOutDate: dateShape,
    lastPossibleCheckOutDate: dateShape,
    lastPossibleCheckInDate: dateShape,
  }).isRequired,
  reservationData: PropTypes.shape({
    monthYear: PropTypes.arrayOf({
      dateShape,
    }),
  }).isRequired,
  updateReservationData: PropTypes.func.isRequired,
  handleClearDates: PropTypes.func.isRequired,
  checkInActive: PropTypes.bool.isRequired,
};

export default Calendar;
