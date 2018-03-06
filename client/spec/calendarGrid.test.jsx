import React from 'react';
import { shallow } from 'enzyme';
import mockdate from 'mockdate';
import obj from '../app/components/calendarGrid';
import ReservationData from './test_data/reservationData';

const { CalendarGrid, getActualDate, getDateClass } = obj;

describe('<CalendarGrid /> Component', () => {
  beforeAll(() => {
    mockdate.set('1/1/2018');
  });

  it('Passing in a check in and check out date should render with dates selected', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<CalendarGrid
      onDateClick={mockFunc}
      dates={{
        checkInDate: ReservationData['0-2018'][2],
        checkOutDate: ReservationData['0-2018'][3],
        lastPossibleCheckInDate: ReservationData['0-2018'][2],
        lastPossibleCheckOutDate: ReservationData['0-2018'][5],
      }}
      reservationData={ReservationData['0-2018']}
      checkInActive={false}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('ActualDate method should return date object represented by the input month, day, and year', () => {
    expect(getActualDate({
      day: 2,
      month: 5,
      year: 2018,
    })).toEqual(new Date('5/2/2018'));
  });
});
