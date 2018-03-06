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
      lastPossibleCheckInDate: undefined,
      lastPossibleCheckOutDate: undefined,
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.updateReservationData = this.updateReservationData.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleCheckOutClick = this.handleCheckOutClick.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.handleClearDates = this.handleClearDates.bind(this);
    this.findLastPossibleCheckOutDate = this.findLastPossibleCheckOutDate.bind(this);
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
      // const lastPossibleCheckInDate = this.findLastPossibleCheckInDate(this.state.checkOutDate);
      // if (lastPossibleCheckInDate !== null) {
      //   return { checkInActive: true, checkOutActive: false, lastPossibleCheckInDate };
      // }
      // return { checkInActive: true, checkOutActive: false, lastPossibleCheckInDate: undefined };
    // });
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

  openCalendar() {
    this.setState({
      showCalendar: true,
    });
  }

  closeCalendar(event, datesDiv) {
    if (!datesDiv.contains(event.target) && this.state.showCalendar) {
      this.setState({
        showCalendar: false, checkOutActive: false, checkInActive: false,
      });
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
      console.log(`check in: ${JSON.stringify(day)}`);
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
              handleClearDates={this.handleClearDates}
              lastPossibleCheckInDate={this.state.lastPossibleCheckInDate}
              lastPossibleCheckOutDate={this.state.lastPossibleCheckOutDate}
            /> : null
        }
      </div>
    );
  }
}

export default App;
