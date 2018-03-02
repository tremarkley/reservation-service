import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './calendar';
import monthName from '../../data/reservationDataObj';

const Popup = props => (
  <div className="pop-up" onClick={props.closeCalendar}>
    <div className="pop-up-content">
      <div className="inner-content">
        <div className="inner-inner-content">
          <div className="close-dialog-container">
            <button className="close-button" onClick={props.onClose} />
          </div>
          <div className="reservations-dialog-container">
            <div className="dates">
              <label htmlFor="dates-container" className="reservation-label">
                <span>Dates</span>
              </label>
              <div id="dates-container" className="dates-container">
                <div className="checkin-container">
                  <input
                    type="text"
                    id="checkin"
                    name="checkin"
                    value=""
                    placeholder="Check In"
                    autoComplete="off"
                    onClick={props.handleCheckInClick}
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
                    onClick={props.handleCheckOutClick}
                  />
                  <div className={`check-out-text ${props.checkOutActive ? 'active' : ''}`}>{props.checkOutDate ? `${monthName.short[props.checkOutDate.month - 1]} ${props.checkOutDate.day}` : 'Check Out'}</div>
                </div>
                {
                  props.showCalendar ?
                    <Calendar dates={{ checkInDate: props.checkInDate, checkOutDate: props.checkOutDate }} onClick={props.handleDateClick} reservationData={props.reservationData} updateReservationData={props.updateReservationData} /> : null
                }
              </div>
            </div>
            <div className="guests">
              <label htmlFor="guests-button" className="guest-label">
                <span>Guests</span>
              </label>
              <button id="guests-button" className="guests-button">
                <div className="guests-container">
                  <span className="guest-text">
                    <span>1 guest</span>
                  </span>
                </div>
              </button>
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

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  reservationData: PropTypes.object.isRequired,
  updateReservationData: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  checkInActive: PropTypes.bool.isRequired,
  checkOutActive: PropTypes.bool.isRequired,
  checkInDate: PropTypes.shape({
    listing_id: PropTypes.number.isRequired,
    minimum_stay: PropTypes.number.isRequired,
    maximum_guests: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }),
  checkOutDate: PropTypes.shape({
    listing_id: PropTypes.number.isRequired,
    minimum_stay: PropTypes.number.isRequired,
    maximum_guests: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }),
  handleDateClick: PropTypes.func.isRequired,
  handleCheckInClick: PropTypes.func.isRequired,
  handleCheckOutClick: PropTypes.func.isRequired,
  closeCalendar: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  checkInDate: undefined,
  checkOutDate: undefined,
};

export default Popup;
