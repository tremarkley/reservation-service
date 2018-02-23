const dates = require('./dates');
const listings = require('./listings');

const reservations = [];

function randomNumberGenerator(minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

let count = 1;
for (let i = 0; i < dates.length; i += 1) {
  const dateId = dates[i].id;
  for (let j = 0; j < listings.length; j += 1) {
    const reservationObj = {};
    reservationObj.id = count;
    reservationObj.listing_id = listings[j].id;
    reservationObj.date_id = dateId;
    reservationObj.price = randomNumberGenerator(100, 800);
    reservationObj.available = Math.random() < 0.85;
    reservations.push(reservationObj);
    count += 1;
  }
}

module.exports = reservations;
