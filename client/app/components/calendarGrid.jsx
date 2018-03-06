import React from 'react';
import PropTypes from 'prop-types';
import dateShape from '../../data/propShapes';
/*  eslint-disable no-unused-vars  */
import css from '../../styles/styles.css';
/*  eslint-enable no-unused-vars  */

const getActualDate = function getActualDate(day) {
  return new Date(`${day.month}-${day.day}-${day.year}`);
};

const getDateClass = function getDateClass(
  index,
  days,
  dates,
  checkInActive,
  lastDayPreviousMonth,
) {
  const day = days[index];
  if (dates.checkInDate === day || dates.checkOutDate === day) {
    return 'date-selected';
  }

  if (dates.checkInDate !== undefined && dates.checkOutDate !== undefined) {
    if (getActualDate(day) > getActualDate(dates.checkInDate)
      && getActualDate(day) < getActualDate(dates.checkOutDate)) {
      return 'between-selected';
    }
  }
  //  check out is active
  if (!checkInActive) {
    if (dates.checkInDate !== undefined) {
      if (getActualDate(day) < getActualDate(dates.checkInDate)
        || getActualDate(day) > getActualDate(dates.lastPossibleCheckOutDate)) {
        return 'not-available';
      }
    } else if (dates.checkInDate === undefined) {
      //  no check in date defined yet, then no lastpossiblecheckoutdate
      //  check out date is available as long as the day before it is available
      if (index > 0) {
        if (days[index - 1].available) {
          return '';
        }
        return 'not-available';
      } else if (lastDayPreviousMonth !== undefined) {
        if (lastDayPreviousMonth.available) {
          return '';
        }
        return 'not-available';
      } else if (lastDayPreviousMonth === undefined) {
        return 'not-available';
      }
    }
  }
  //  selecting check in
  if (checkInActive) {
    // debugger
    if (dates.lastPossibleCheckInDate !== undefined) {
      if (getActualDate(day) < getActualDate(dates.lastPossibleCheckInDate)) {
        return 'not-available';
      }
    }
    if (dates.lastPossibleCheckOutDate !== undefined) {
      if (getActualDate(day) > getActualDate(dates.lastPossibleCheckOutDate)) {
        return 'not-available';
      }
    }
    if (!day.available) {
      return 'not-available';
    }
  }
  return '';
};

const addRows = function addRows(days, clickHandler, dates, checkInActive, lastDayPreviousMonth) {
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
    const dateClass = getDateClass(i, days, dates, checkInActive, lastDayPreviousMonth);
    cells.push(<td key={`date-${(results.length + 1) * cells.length}`} className={`date ${dateClass}`} onClick={dateClass !== 'not-available' ? () => clickHandler(days[i]) : null}>{days[i].day}</td>);

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
      {addRows(
        props.reservationData,
        props.onDateClick,
        props.dates,
        props.checkInActive,
        props.lastDayPreviousMonth,
      )}
    </tbody>
  </table>
);

CalendarGrid.propTypes = {
  reservationData: PropTypes.arrayOf(dateShape).isRequired,
  onDateClick: PropTypes.func.isRequired,
  dates: PropTypes.shape({
    checkInDate: dateShape,
    checkOutDate: dateShape,
    lastPossibleCheckOutDate: dateShape,
    lastPossibleCheckInDate: dateShape,
  }).isRequired,
  checkInActive: PropTypes.bool.isRequired,
  lastDayPreviousMonth: dateShape,
};

CalendarGrid.defaultProps = {
  lastDayPreviousMonth: undefined,
};

export default { CalendarGrid, getActualDate, getDateClass };
