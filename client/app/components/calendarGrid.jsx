import React from 'react';
import PropTypes from 'prop-types';
// import sampleData from '../../data/sampleData';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const addRows = function addRows(days) {
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

    cells.push(<td key={`date-${(results.length + 1) * cells.length}`} className="date">{days[i].day}</td>);

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
      {addRows(props.reservationData)}
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
};

export default CalendarGrid;
