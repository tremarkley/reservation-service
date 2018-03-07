import React from 'react';
import { shallow } from 'enzyme';
import mockdate from 'mockdate';
import Calendar from '../app/components/calendar';
import ReservationData from './test_data/reservationData';

describe('<Calendar /> Component', () => {
  beforeAll(() => {
    mockdate.set('1/1/2018');
  });

  it('Should increase month when right arrow is clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{}}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    expect(instance.state.month).toBe(0);
    instance.rightArrowClick();
    expect(instance.state.month).toBe(1);
  });

  it('Should not decrease month if on the current month', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{}}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    expect(instance.state.month).toBe(0);
    instance.leftArrowClick();
    expect(instance.state.month).toBe(0);
  });

  it('Should decrease the month if ahead of current month', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{}}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    expect(instance.state.month).toBe(0);
    instance.rightArrowClick();
    expect(instance.state.month).toBe(1);
    instance.leftArrowClick();
    expect(instance.state.month).toBe(0);
  });

  it('Should set the state to the same month and year as the check in date if one is passed in', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{
        checkInDate: {
          listing_id: 1,
          minimum_stay: 3,
          maximum_guests: 2,
          month: 2,
          day: 3,
          year: 2018,
          price: '535.00',
          available: true,
        },
        checkOutDate: {
          listing_id: 1,
          minimum_stay: 3,
          maximum_guests: 2,
          month: 3,
          day: 3,
          year: 2018,
          price: '535.00',
          available: true,
        },
      }}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    expect(instance.state.month).toBe(1);
    expect(instance.state.year).toBe(2018);
  });

  it('Should set the month and year to the same as the check out date if it is passed in without a check in date', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{
        checkOutDate: {
          listing_id: 1,
          minimum_stay: 3,
          maximum_guests: 2,
          month: 3,
          day: 3,
          year: 2018,
          price: '535.00',
          available: true,
        },
      }}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    expect(instance.state.month).toBe(2);
    expect(instance.state.year).toBe(2018);
  });

  it('Should set the month and year to the current time if one is not passed in', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Calendar
      id={1}
      onClick={mockFunc}
      dates={{}}
      reservationData={ReservationData}
      updateReservationData={mockFunc}
      handleClearDates={mockFunc}
      checkInActive={false}
    />);
    const instance = wrapper.instance();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    expect(instance.state.month).toBe(currentMonth);
    expect(instance.state.year).toBe(currentYear);
  });
});

