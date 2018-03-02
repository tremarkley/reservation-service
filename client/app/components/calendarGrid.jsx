import React from 'react';
import PropTypes from 'prop-types';
// import sampleData from '../../data/sampleData';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const getActualDate = function getActualDate(day) {
  return new Date(`${day.month}-${day.day}-${day.year}`);
};

const getDateClass = function getDateClass(day, dates) {
  if (dates.checkInDate === undefined && dates.checkOutDate === undefined) {
    return '';
  } else if (dates.checkInDate === day || dates.checkOutDate === day) {
    return 'date-selected';
  } else if (dates.checkInDate !== undefined && dates.checkOutDate !== undefined) {
    if (getActualDate(day) > getActualDate(dates.checkInDate)
      && getActualDate(day) < getActualDate(dates.checkOutDate)) {
      return 'between-selected';
    }
  }
  return '';
};

const addRows = function addRows(days, clickHandler, dates) {
  let cells = [];
  const results = [];
  for (let i = 0; i < days.length; i += 1) {
    //  every 7 cells make a new row
    if (cells.length === 7) {
      results.push(<tr key={`row-${results.length}`}>{cells}</tr>);
      cells = [];
    }
    //  first day of the month
    if (i === 0) {
      const firstDay = new Date(`${days[i].month}-${days[i].day}-${days[i].year}`);
      const firstDayOfWeek = firstDay.getDay();
      for (let j = 0; j < firstDayOfWeek; j += 1) {
        cells.push(<td key={`date-${(results.length + 1) * cells.length}`} />);
      }
    }

    // if date is between check in and check out then give it class between

    cells.push(<td key={`date-${(results.length + 1) * cells.length}`} className={`date ${getDateClass(days[i], dates)}`} onClick={() => clickHandler(days[i])}>{days[i].day}</td>);

    //  last day of the month
    if (i === days.length - 1) {
      const lastDay = new Date(`${days[i].month}-${days[i].day}-${days[i].year}`);
      const lastDayOfWeek = lastDay.getDay();
      for (let j = lastDayOfWeek + 1; j < 7; j += 1) {
        cells.push(<td key={`date-${(results.length + 1) * cells.length}`} />);
      }
      results.push(<tr key={`row-${results.length}`}>{cells}</tr>);
    }
  }

  return results;
};

const CalendarGrid = props => (
  <table className="calendar-grid">
    <tbody>
      {addRows(props.reservationData, props.onDateClick, props.dates)}
    </tbody>
  </table>
);

CalendarGrid.propTypes = {
  reservationData: PropTypes.arrayOf(PropTypes.shape({
    listing_id: PropTypes.number.isRequired,
    minimum_stay: PropTypes.number.isRequired,
    maximum_guests: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  })).isRequired,
  onDateClick: PropTypes.func.isRequired,
  dates: PropTypes.shape({
    checkInDate: PropTypes.shape({
      listing_id: PropTypes.number.isRequired,
      minimum_stay: PropTypes.number.isRequired,
      maximum_guests: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      day: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    }),
    checkOutDate: PropTypes.shape({
      listing_id: PropTypes.number.isRequired,
      minimum_stay: PropTypes.number.isRequired,
      maximum_guests: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      day: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default CalendarGrid;
