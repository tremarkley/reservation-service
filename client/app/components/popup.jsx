import React from 'react';
import PropTypes from 'prop-types';
import dateShape from '../../data/propShapes';
import Calendar from './calendar';
import monthName from '../../data/months';
import Guests from './guests';

const url = process.env.reservations_url || 'http://localhost:3002';

const Popup = (props) => {
  let datesDiv = null;
  let checkInDiv = null;
  let checkOutDiv = null;
  let guestsDiv = null;
  return (
    <div
      className="pop-up"
      onClick={event => props.popupClick(event.target, datesDiv, checkInDiv, checkOutDiv, guestsDiv)}
    >
      <div className="pop-up-content">
        <div className="inner-content">
          <div className="inner-inner-content">
            <div className="close-dialog-container">
              <button className="close-button" style={{ backgroundImage: `url(${url}/images/x-icon.png)` }} onClick={props.onClose} />
            </div>
            <div className="reservations-dialog-container">
              <div className="dates">
                <label htmlFor="dates-container" className="reservation-label">
                  <span>Dates</span>
                </label>
                <div
                  id="dates-container"
                  className="dates-container"
                  ref={(input) => { datesDiv = input; }}
                >
                  <div className="checkin-container">
                    <input
                      type="text"
                      id="checkin"
                      name="checkin"
                      value=""
                      placeholder="Check In"
                      autoComplete="off"
                      ref={(input) => { checkInDiv = input; }}
                    />
                    <div className={`check-in-text ${props.checkInActive ? 'active' : ''}`}>{props.checkInDate ? `${monthName.short[props.checkInDate.month - 1]} ${props.checkInDate.day}` : 'Check In'}</div>
                  </div> {
                    !props.checkInActive && !props.checkOutActive ?
                      <div className="hyphen">-</div> : null
                  }
                  <div className="checkout-container">
                    <input
                      type="text"
                      id="checkout"
                      name="checkout"
                      value=""
                      placeholder="Check Out"
                      autoComplete="off"
                      ref={(input) => { checkOutDiv = input; }}
                    />
                    <div className={`check-out-text ${props.checkOutActive ? 'active' : ''}`}>{props.checkOutDate ? `${monthName.short[props.checkOutDate.month - 1]} ${props.checkOutDate.day}` : 'Check Out'}</div>
                  </div>
                  {
                    props.showCalendar ?
                      <Calendar
                        id={props.id}
                        dates={
                        {
                          checkInDate: props.checkInDate,
                          checkOutDate: props.checkOutDate,
                          lastPossibleCheckInDate: props.lastPossibleCheckInDate,
                          lastPossibleCheckOutDate: props.lastPossibleCheckOutDate,
                        }}
                        checkInActive={props.checkInActive}
                        onClick={props.handleDateClick}
                        reservationData={props.reservationData}
                        updateReservationData={props.updateReservationData}
                        handleClearDates={props.handleClearDates}
                      /> : null
                  }
                </div>
              </div>
              <div className="guests">
                <label htmlFor="guests-button" className="guest-label">
                  <span>Guests</span>
                </label>
                <button
                  id="guests-button"
                  className="guests-button"
                  ref={(input) => { guestsDiv = input; }}
                >
                  <div className="guests-container">
                    <span className={`guest-text ${props.showGuestDialog ? 'active' : ''}`}>
                      <span>1 guest</span>
                    </span>
                  </div>
                </button>
                {
                      props.showGuestDialog ?
                        <Guests guests={props.guests} incrementGuests={props.incrementGuests} decrementGuests={props.decrementGuests} /> : null
                    }
              </div>
            </div>
            <div className="booking-button-container">
              <button className="book-now-button">
                <span className="book-now-span">
                  <div className="book-now-div">
                    <span>Book</span>
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  reservationData: PropTypes.shape({
    monthYear: PropTypes.arrayOf({
      dateShape,
    }),
  }).isRequired,
  updateReservationData: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  checkInActive: PropTypes.bool.isRequired,
  checkOutActive: PropTypes.bool.isRequired,
  checkInDate: dateShape,
  checkOutDate: dateShape,
  handleDateClick: PropTypes.func.isRequired,
  popupClick: PropTypes.func.isRequired,
  handleClearDates: PropTypes.func.isRequired,
  lastPossibleCheckInDate: dateShape,
  lastPossibleCheckOutDate: dateShape,
  showGuestDialog: PropTypes.bool.isRequired,
  guests: PropTypes.shape({
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
    infants: PropTypes.number.isRequired,
  }).isRequired,
  incrementGuests: PropTypes.func.isRequired,
  decrementGuests: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  checkInDate: undefined,
  checkOutDate: undefined,
  lastPossibleCheckInDate: undefined,
  lastPossibleCheckOutDate: undefined,
};

export default Popup;
