import React from 'react';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const Guests = () => (
  <div className="guests-dialog">
    <div className="guests-dialog-content">
      <div className="guests-counter-div">
        <div className="guests-counter-content">
          <div className="guests-type-label-div">
            <div className="guests-type-label-content">
              <div className="guests-type-label-text">
                <span>Adults</span>
              </div>
            </div>
          </div>
          <div className="guests-controller-container">
            <div className="guests-controller-content">
              <div className="minus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-disabled">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="subtract"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="guest-count-container">
                <div className="guest-count-div">1</div>
              </div>
              <div className="plus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-active">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="add"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                      <rect height="12" rx="1" width="2" x="11" y="6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="guests-counter-div description">
        <div className="guests-counter-content">
          <div className="guests-type-label-div">
            <div className="guests-type-label-content">
              <div className="guests-type-label-text">
                <span>Children</span>
              </div>
              <div className="guest-label-description-content">
                <span>Ages 2 - 12</span>
              </div>
            </div>
          </div>
          <div className="guests-controller-container">
            <div className="guests-controller-content">
              <div className="minus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-disabled">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="subtract"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="guest-count-container">
                <div className="guest-count-div">0</div>
              </div>
              <div className="plus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-active">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="add"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                      <rect height="12" rx="1" width="2" x="11" y="6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="guests-counter-div description">
        <div className="guests-counter-content">
          <div className="guests-type-label-div">
            <div className="guests-type-label-content">
              <div className="guests-type-label-text">
                <span>Infants</span>
              </div>
              <div className="guest-label-description-content">
                <span>Under 2</span>
              </div>
            </div>
          </div>
          <div className="guests-controller-container">
            <div className="guests-controller-content">
              <div className="minus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-disabled">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="subtract"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="guest-count-container">
                <div className="guest-count-div">0</div>
              </div>
              <div className="plus-button-container">
                <button className="guests-counter-button">
                  <span className="guests-counter-span-active">
                    <svg
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="add"
                      focusable="false"
                      className="svg-guest-counter"
                    >
                      <rect height="2" rx="1" width="12" x="6" y="11" />
                      <rect height="12" rx="1" width="2" x="11" y="6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="guests-fine-print">
        <div className="guests-fine-print-text-container">
          <div className="guests-fine-print-text">
            <span>4 guests maximum. Infants don’t count toward the number of guests.</span>
          </div>
        </div>
        <div className="guests-close-button-container">
          <div className="white-space" />
          <div className="guests-close-button-div">
            <button type="button" className="guests-close-button" aria-disabled="false" aria-busy="false"><span>Close</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Guests;
