const listings = [];

function randomNumberGenerator(minVal, maxVal) {
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

for (let i = 1; i <= 200; i += 1) {
  const newListing = {};
  newListing.id = i;
  newListing.minimum_stay = randomNumberGenerator(1, 4);
  newListing.maximum_guests = randomNumberGenerator(2, 10);
  listings.push(newListing);
}

module.exports = listings;

