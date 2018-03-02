import React from 'react';
import PropTypes from 'prop-types';
import Calendar from './calendar';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      checkInActive: false,
      checkOutActive: false,
    };
    this.openCalendar = this.openCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleCheckOutClick = this.handleCheckOutClick.bind(this);
  }

  handleCheckInClick() {
    this.openCalendar();
    this.setState({ checkInActive: true, checkOutActive: false });
  }

  handleCheckOutClick() {
    this.openCalendar();
    this.setState({ checkOutActive: true, checkInActive: false });
  }

  openCalendar() {
    this.setState({
      showCalendar: true,
    });
  }

  closeCalendar(event) {
    const datesDiv = document.getElementById('dates-container');
    if (!datesDiv.contains(event.target) && this.state.showCalendar) {
      this.setState({
        showCalendar: false,
      });
    }
  }

  render() {
    return (
      <div className="pop-up" onClick={this.closeCalendar}>
        <div className="pop-up-content">
          <div className="inner-content">
            <div className="inner-inner-content">
              <div className="close-dialog-container">
                <button className="close-button" onClick={this.props.onClose} />
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
                        onClick={this.handleCheckInClick}
                      />
                      <div className={`check-in-text ${this.state.checkInActive ? 'active' : ''}`}>Check In</div>
                    </div> {
                      !this.state.checkInActive && !this.state.checkOutActive ?
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
                        onClick={this.handleCheckOutClick}
                      />
                      <div className={`check-out-text ${this.state.checkOutActive ? 'active' : ''}`}>Check Out</div>
                    </div>
                    {
                      this.state.showCalendar ?
                        <Calendar /> : null
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
  }
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Popup;
