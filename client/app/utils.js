const utils = {
  totalNights: function totalNights(checkIn, checkOut) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const checkInDate = Date.UTC(checkIn.year, checkIn.month - 1, checkIn.day);
    const checkOutDate = Date.UTC(checkOut.year, checkOut.month - 1, checkOut.day);
    const diffDays = (checkOutDate - checkInDate) / MS_PER_DAY;
    return diffDays;
  },
};

export default utils;
