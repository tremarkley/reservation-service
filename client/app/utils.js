const utils = {
  totalNights: function totalNights(checkIn, checkOut) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const checkInDate = new Date(`${checkIn.month}-${checkIn.day}-${checkIn.year}`);
    const checkOutDate = new Date(`${checkOut.month}-${checkOut.day}-${checkOut.year}`);
    const diffDays = (checkOutDate - checkInDate) / MS_PER_DAY;
    return diffDays;
  },
};

export default utils;
