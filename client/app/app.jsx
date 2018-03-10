import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
/*  eslint-disable no-unused-vars  */
import css from '../styles/styles.css';
/*  eslint-enable no-unused-vars  */
import Popup from './components/popup';

const url = process.env.reservations_url || 'http://localhost:3002';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      reservationData: {},
      showCalendar: false,
      checkInActive: false,
      checkOutActive: false,
      checkInDate: undefined,
      checkOutDate: undefined,
      lastPossibleCheckInDate: undefined,
      lastPossibleCheckOutDate: undefined,
      showGuestDialog: false,
      guests: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      maxGuests: 1,
      nightlyPrice: undefined,
      minimumNights: 1,
      showBookingConfirmation: false,
      showBookingError: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.updateReservationData = this.updateReservationData.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.popupClick = this.popupClick.bind(this);
    this.handleClearDates = this.handleClearDates.bind(this);
    this.findLastPossibleCheckOutDate = this.findLastPossibleCheckOutDate.bind(this);
    this.incrementGuests = this.incrementGuests.bind(this);
    this.decrementGuests = this.decrementGuests.bind(this);
    this.toggleGuestDialog = this.toggleGuestDialog.bind(this);
    this.closeGuestsDialog = this.closeGuestsDialog.bind(this);
    this.generateBookingConfirmation = this.generateBookingConfirmation.bind(this);
    this.generateBookingError = this.generateBookingError.bind(this);
    this.bookNowClick = this.bookNowClick.bind(this);
    this.closeBookingConfirmation = this.closeBookingConfirmation.bind(this);
    this.closeBookingError = this.closeBookingError.bind(this);
  }

  componentDidMount() {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    axios.get(`/${this.props.id}`, { params: { month: month + 1, year } })
      .then((response) => {
        const maxGuests = response.data[0].maximum_guests;
        const nightlyPrice = +response.data[0].price;
        const minimumNights = +response.data[0].minimum_stay;
        this.setState({ maxGuests, nightlyPrice, minimumNights });
        this.updateReservationData(response.data, month, year);
      });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  updateReservationData(data, month, year) {
    this.setState((prevState) => {
      const nextReservationData = prevState.reservationData;
      nextReservationData[`${month}-${year}`] = data;
      //  recalculate last possible check out date with new month data
      if (this.state.checkInDate) {
        const lastPossibleCheckOutDate = this.findLastPossibleCheckOutDate(this.state.checkInDate);
        return { reservationData: nextReservationData, lastPossibleCheckOutDate };
      }
      return { reservationData: nextReservationData };
    });
  }

  handleCheckInClick() {
    this.openCalendar();
    this.setState({ checkInActive: true, checkOutActive: false }, () => {
      const lastPossibleCheckInDate = this.findLastPossibleCheckInDate(this.state.checkOutDate);
      this.setState({ checkInActive: true, checkOutActive: false, lastPossibleCheckInDate });
    });
  }

  handleCheckOutClick() {
    this.openCalendar();
    this.setState({ checkOutActive: true, checkInActive: false });
  }

  handleClearDates() {
    this.setState({
      checkInDate: undefined,
      checkOutDate: undefined,
      lastPossibleCheckOutDate: undefined,
      lastPossibleCheckInDate: undefined,
    });
  }

  bookNowClick() {
    if (this.state.checkInDate && this.state.checkOutDate) {
      this.makeBooking();
    }
  }

  makeBooking() {
    const checkInDate = `${this.state.checkInDate.month}-${this.state.checkInDate.day}-${this.state.checkInDate.year}`;
    const checkOutDate = `${this.state.checkOutDate.month}-${this.state.checkOutDate.day}-${this.state.checkOutDate.year}`;
    axios.put(`/${this.props.id}`, { checkInDate, checkOutDate })
      .then(() => {
        this.setState({
          showBookingConfirmation: true,
          lastPossibleCheckInDate: undefined,
          lastPossibleCheckOutDate: undefined,
          guests: {
            adults: 1,
            children: 0,
            infants: 0,
          },
          reservationData: {},
        });
      })
      .catch((err) => {
        console.log(`error booking: ${err}`);
        this.setState({ showBookingError: true });
      });
  }

  generateBookingConfirmation() {
    return (
      <div className="booking-confirmation-div">
        <div className="close-dialog-container booking">
            <button className="close-button" style={{ backgroundImage: `url(${url}/images/x-icon.png)` }} onClick={this.closeBookingConfirmation} />
        </div>
        <div className="booking-confirmation-content">
          <span className="booking-confirmation-span">You're booked!</span>
        </div>
      </div>
    );
  }

  generateBookingError() {
    return (
      <div className="booking-confirmation-div">
        <div className="close-dialog-container booking">
            <button className="close-button" style={{ backgroundImage: `url(${url}/images/x-icon.png)` }} onClick={this.closeBookingError} />
        </div>
        <div className="booking-confirmation-content">
          <span className="booking-confirmation-span error">Error Making Booking, Try Again</span>
        </div>
      </div>
    );
  }

  closeBookingConfirmation() {
    this.setState({
      showBookingConfirmation: false,
      checkInDate: undefined,
      checkOutDate: undefined,
      showPopup: false,
    });
  }

  closeBookingError() {
    this.setState({
      showBookingError: false,
    });
  }

  openCalendar() {
    this.setState({
      showCalendar: true,
    });
  }

  closeCalendar() {
    this.setState({
      showCalendar: false, checkOutActive: false, checkInActive: false,
    });
  }

  popupClick(target, datesDiv, checkInDiv, checkOutDiv, guestsDiv) {
    if (!datesDiv.contains(target) && this.state.showCalendar) {
      this.closeCalendar();
    }
    if (checkInDiv.contains(target)) {
      this.handleCheckInClick();
    }
    if (checkOutDiv.contains(target)) {
      this.handleCheckOutClick();
    }
    if (!guestsDiv.contains(target) && this.state.showGuestDialog) {
      this.closeGuestsDialog();
    }
  }

  //  call this every time we get a new month, if there is a check in date
  //  passes in the current check in date
  findLastPossibleCheckOutDate(date) {
    const index = date.day - 1;
    let lastDate = date;
    for (let j = date.month - 1; j < 12; j += 1) {
      if (this.state.reservationData[`${j}-${date.year}`] !== undefined) {
        let loopStart = 0;
        if (j === date.month - 1) {
          loopStart = index;
        }
        for (let i = loopStart; i < this.state.reservationData[`${j}-${date.year}`].length; i += 1) {
          lastDate = this.state.reservationData[`${j}-${date.year}`][i];
          if (!this.state.reservationData[`${j}-${date.year}`][i].available) {
            return lastDate;
          }
        }
      }
    }
    return lastDate;
  }
  //  date passed in is the check out date
  findLastPossibleCheckInDate(date) {
    if (date === undefined) {
      return undefined;
    }
    if (this.state.checkInDate && !this.state.checkInActive) {
      return this.state.checkInDate;
    }
    const index = date.day - 1;
    let lastDate = date;
    const now = new Date();
    const earliestMonth = now.getMonth();
    for (let j = date.month - 1; j >= earliestMonth; j -= 1) {
      if (this.state.reservationData[`${j}-${date.year}`] !== undefined) {
        let loopStart = this.state.reservationData[`${j}-${date.year}`].length - 1;
        if (j === date.month - 1) {
          loopStart = index - 1;
        }
        for (let i = loopStart; i >= 0; i -= 1) {
          if (!this.state.reservationData[`${j}-${date.year}`][i].available) {
            return lastDate;
          }
          lastDate = this.state.reservationData[`${j}-${date.year}`][i];
        }
      }
    }
    return lastDate;
  }

  handleDateClick(day) {
    if (this.state.checkInActive) {
      const dayDate = new Date(`${day.month}-${day.day}-${day.year}`);
      // if check in date is later than current check out date then we need
      // to set checkout date to undefined
      const lastPossibleCheckOutDate = this.findLastPossibleCheckOutDate(day);
      this.setState(() => {
        //  check to see if check out date needs to be cleared
        if (this.state.checkOutDate !== undefined) {
          const checkOutDateObj = new Date(`${this.state.checkOutDate.month}-${this.state.checkOutDate.day}-${this.state.checkOutDate.year}`);
          if (checkOutDateObj <= dayDate) {
            return {
              checkInDate: day,
              checkOutDate: undefined,
              checkInActive: false,
              checkOutActive: true,
              lastPossibleCheckOutDate,
              lastPossibleCheckInDate: day,
            };
          }
        }
        return {
          checkInDate: day,
          checkInActive: false,
          checkOutActive: true,
          lastPossibleCheckOutDate,
          lastPossibleCheckInDate: day,
        };
      });
    } else if (this.state.checkOutActive) {
      //  Airbnb is setup in such a way that once a certain check in date
      //  is selected it doesnt allow you to
      //  select a check out date before or on that check in date
      if (day !== this.state.checkInDate) {
        const lastPossibleCheckInDate = this.findLastPossibleCheckInDate(day);
        //  if we have a check in and check out date then close calendar
        if (this.state.checkInDate) {
          this.setState({
            checkOutDate: day,
            showCalendar: false,
            checkOutActive: false,
            checkInActive: false,
            lastPossibleCheckInDate,
          });
        } else {
          this.setState({
            checkOutDate: day, checkOutActive: false, checkInActive: true, lastPossibleCheckInDate,
          });
        }
      }
    }
  }

  toggleGuestDialog() {
    this.setState({
      showGuestDialog: !this.state.showGuestDialog,
    });
  }

  closeGuestsDialog() {
    this.setState({
      showGuestDialog: false,
    });
  }

  incrementGuests(type) {
    this.setState((prevState) => {
      const nextState = prevState.guests;
      nextState[type] += 1;
      return { guests: nextState };
    });
  }

  decrementGuests(type) {
    this.setState((prevState) => {
      const nextState = prevState.guests;
      nextState[type] -= 1;
      return { guests: nextState };
    });
  }

  render() {
    return (
      <div className="reservations-footer">
        <div className="content">
          <div className="price-footer-div">
            <span className="price-footer-span">{`${this.state.nightlyPrice !== undefined ? `$${this.state.nightlyPrice.toLocaleString()}` : ''}`}</span>
            <span className="per-night-footer-span">{`${this.state.nightlyPrice !== undefined ? ' per night' : ''}`}</span>
          </div>
          <button className="bookButton" onClick={this.togglePopup}>Book</button>
        </div>
        {
          this.state.showPopup ?
            <Popup
              id={this.props.id}
              onClose={this.togglePopup}
              reservationData={this.state.reservationData}
              showCalendar={this.state.showCalendar}
              updateReservationData={this.updateReservationData}
              checkInActive={this.state.checkInActive}
              checkOutActive={this.state.checkOutActive}
              checkInDate={this.state.checkInDate}
              checkOutDate={this.state.checkOutDate}
              handleDateClick={this.handleDateClick}
              popupClick={this.popupClick}
              handleClearDates={this.handleClearDates}
              lastPossibleCheckInDate={this.state.lastPossibleCheckInDate}
              lastPossibleCheckOutDate={this.state.lastPossibleCheckOutDate}
              showGuestDialog={this.state.showGuestDialog}
              guests={this.state.guests}
              incrementGuests={this.incrementGuests}
              decrementGuests={this.decrementGuests}
              maxGuests={this.state.maxGuests}
              toggleGuestDialog={this.toggleGuestDialog}
              closeGuestsDialog={this.closeGuestsDialog}
              nightlyPrice={this.state.nightlyPrice}
              minimumNights={this.state.minimumNights}
              showBookingConfirmation={this.state.showBookingConfirmation}
              generateBookingConfirmation={this.generateBookingConfirmation}
              showBookingError={this.state.showBookingError}
              generateBookingError={this.generateBookingError}
              bookNowClick={this.bookNowClick}
              closeBookingError={this.closeBookingError}
              closeBookingConfirmation={this.closeBookingConfirmation}
            /> : null
        }
      </div>
    );
  }
}

App.propTypes = {
  id: PropTypes.number.isRequired,
};

export default App;
window.Reservations = App;
