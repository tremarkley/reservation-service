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
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.updateReservationData = this.updateReservationData.bind(this);
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

  render() {
    return (
      <div className="reservations-footer">
        <div className="content">
          <button className="bookButton" onClick={this.togglePopup}>Book</button>
        </div>
        {
          this.state.showPopup ?
            <Popup onClose={this.togglePopup} reservationData={this.state.reservationData} updateReservationData={this.updateReservationData} /> : null
        }
      </div>
    );
  }
}

export default App;
