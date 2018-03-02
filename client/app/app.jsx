import React from 'react';
/*  eslint-disable no-unused-vars  */
import css from '../styles/styles.css';
/*  eslint-enable no-unused-vars  */
import Popup from './components/popup';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      reservationData: {},
      showCalendar: false,
      checkInActive: false,
      checkOutActive: false,
      checkInDate: undefined,
      checkOutDate: undefined,
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.updateReservationData = this.updateReservationData.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleCheckOutClick = this.handleCheckOutClick.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
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
      return { reservationData: nextReservationData };
    });
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
        showCalendar: false, checkOutActive: false, checkInActive: false,
      });
    }
  }

  handleDateClick(day) {
    if (this.state.checkInActive) {
      console.log(`check in: ${JSON.stringify(day)}`);
      const dayDate = new Date(`${day.month}-${day.day}-${day.year}`);
      // if check in date is later than current check out date then we need
      // to set checkout date to undefined
      this.setState(() => {
        if (this.state.checkOutDate !== undefined) {
          const checkOutDateObj = new Date(`${this.state.checkOutDate.month}-${this.state.checkOutDate.day}-${this.state.checkOutDate.year}`);
          if (checkOutDateObj <= dayDate) {
            return {
              checkInDate: day, checkOutDate: undefined, checkInActive: false, checkOutActive: true,
            };
          }
        }
        return {
          checkInDate: day, checkInActive: false, checkOutActive: true,
        };
      });
    } else if (this.state.checkOutActive) {
      //  Airbnb is setup in such a way that once a certain check in date
      //  is selected it doesnt allow you to
      //  select a check out date before oron that check in date
      this.setState({ checkOutDate: day });
    }
  }

  render() {
    return (
      <div className="reservations-footer">
        <div className="content">
          <button className="bookButton" onClick={this.togglePopup}>Book</button>
        </div>
        {
          this.state.showPopup ?
            <Popup
              onClose={this.togglePopup}
              reservationData={this.state.reservationData}
              showCalendar={this.state.showCalendar}
              updateReservationData={this.updateReservationData}
              checkInActive={this.state.checkInActive}
              checkOutActive={this.state.checkOutActive}
              checkInDate={this.state.checkInDate}
              checkOutDate={this.state.checkOutDate}
              handleDateClick={this.handleDateClick}
              handleCheckInClick={this.handleCheckInClick}
              handleCheckOutClick={this.handleCheckOutClick}
              closeCalendar={this.closeCalendar}
            /> : null
        }
      </div>
    );
  }
}

export default App;
