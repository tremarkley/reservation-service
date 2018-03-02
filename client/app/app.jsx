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
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
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
            <Popup onClose={this.togglePopup} /> : null
        }
      </div>
    );
  }
}

export default App;
