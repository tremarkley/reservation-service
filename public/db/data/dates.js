const dates = [];

const incrementDate = function incrementDate(date) {
  return date.setHours(date.getHours() + 24);
};

const newDate = new Date('January 01, 2018');
for (let i = 0; i < 365; i += 1) {
  const dateObj = {};
  dateObj.month = newDate.getMonth() + 1;
  dateObj.day = newDate.getDate();
  dateObj.year = newDate.getFullYear();
  dates.push(dateObj);
  incrementDate(newDate);
}

module.exports = dates;

