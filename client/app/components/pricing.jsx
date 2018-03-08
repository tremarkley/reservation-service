import React from 'react';

const Pricing = () => (
  <div className="pricing-div">
    <div className="price-section-div">
      <div className="price-description-div">
        <span className="price-description-span">$400 x 3 nights</span>
      </div>
      <div className="total-section-price-div">
        <span className="total-section-price-span">$1200</span>
      </div>
    </div>
    <div className="price-border" />
    <div className="price-section-div">
      <div className="price-description-div">
        <span className="price-description-span">Cleaning Fee</span>
      </div>
      <div className="total-section-price-div">
        <span className="total-section-price-span">$75</span>
      </div>
    </div>
    <div className="price-border" />
    <div className="price-section-div">
      <div className="price-description-div">
        <span className="price-description-span">Service Fee</span>
      </div>
      <div className="total-section-price-div">
        <span className="total-section-price-span">$5</span>
      </div>
    </div>
    <div className="price-border" />
    <div className="price-section-div">
      <div className="price-description-div">
        <span className="price-description-span total">Total</span>
      </div>
      <div className="total-section-price-div">
        <span className="total-section-price-span total">$1280</span>
      </div>
    </div>
  </div>
);

export default Pricing;
