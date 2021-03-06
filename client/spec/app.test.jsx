import React from 'react';
import { shallow, mount } from 'enzyme';
import mockdate from 'mockdate';
import App from '../app/app';
import reservationData from './test_data/reservationData';

describe('<App /> component', () => {
  beforeAll(() => {
    mockdate.set('1/1/2018');
  });

  let wrapper;
  let instance;
  beforeEach(() => {
    wrapper = shallow(<App id={1} />);
    instance = wrapper.instance();
    instance.updateReservationData(reservationData['0-2018'], 0, 2018);
    instance.updateReservationData(reservationData['1-2018'], 1, 2018);
  });

  it('Clicking book button should render popup component', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  //  these tests must be here because the functions for opening the calendar are at the app level
  it('Clicking checkin button should render calendar component', () => {
    wrapper = mount(<App id={1} />);
    wrapper.find('button').simulate('click');
    wrapper.find('#checkin').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Clicking outside of checkin/checkout button should close calendar component', () => {
    wrapper = mount(<App id={1} />);
    wrapper.find('button').simulate('click');
    wrapper.find('.pop-up').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should calculate lastPossibleCheckOutDate when a checkin is selected', () => {
    const lastPossibleCheckOut = instance.findLastPossibleCheckOutDate({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 1,
      year: 2018,
      price: '163.00',
      available: true,
    });
    expect(lastPossibleCheckOut).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 6,
      year: 2018,
      price: '284.00',
      available: false,
    });
  });

  it('Should calculate lastPossibleCheckOutDate across months when a checkin is selected', () => {
    const lastPossibleCheckOut = instance.findLastPossibleCheckOutDate({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 27,
      year: 2018,
      price: '757.00',
      available: true,
    });
    expect(lastPossibleCheckOut).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 2,
      day: 7,
      year: 2018,
      price: '637.00',
      available: false,
    });
  });

  it('Should calculate lastPossibleCheckInDate when a checkout is selected', () => {
    const lastPossibleCheckIn = instance.findLastPossibleCheckInDate({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 9,
      year: 2018,
      price: '735.00',
      available: false,
    });
    expect(lastPossibleCheckIn).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 7,
      year: 2018,
      price: '237.00',
      available: true,
    });
  });

  it('Should calculate lastPossibleCheckInDate when a checkout is selected across months', () => {
    const lastPossibleCheckIn = instance.findLastPossibleCheckInDate({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 2,
      day: 7,
      year: 2018,
      price: '637.00',
      available: false,
    });
    expect(lastPossibleCheckIn).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 27,
      year: 2018,
      price: '757.00',
      available: true,
    });
  });

  it('Should set lastPossibleCheckInDate as the current check in date if there is one and check out is active', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 5,
      year: 2018,
      price: '634.00',
      available: true,
    });
    const lastPossibleCheckIn = instance.findLastPossibleCheckInDate({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 6,
      year: 2018,
      price: '284.00',
      available: false,
    });
    expect(lastPossibleCheckIn).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 5,
      year: 2018,
      price: '634.00',
      available: true,
    });
  });

  it('Should set lastPossibleCheckInDate as the earliest available date if check in is active and a checkout is selected', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 5,
      year: 2018,
      price: '634.00',
      available: true,
    });
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 6,
      year: 2018,
      price: '284.00',
      available: false,
    });
    instance.handleCheckInClick();
    expect(instance.state.lastPossibleCheckInDate).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 1,
      year: 2018,
      price: '163.00',
      available: true,
    });
  });

  it('Should set check in date when check in is active and a date is clicked', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    expect(instance.state.checkInDate).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
  });

  it('Should set check out date when check out is active and a date is clicked', () => {
    instance.handleCheckOutClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    expect(instance.state.checkOutDate).toEqual({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
  });

  it('Should switch to check out active after a check in date is selected', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    expect(instance.state.checkOutActive).toBe(true);
  });

  it('Should switch to check in active after a check out date is selected', () => {
    instance.handleCheckOutClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    expect(instance.state.checkInActive).toBe(true);
  });

  it('Should make check in and check out active false after selecting check out and check in date', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 24,
      year: 2018,
      price: '341.00',
      available: true,
    });
    expect(instance.state.checkInActive).toBe(false);
    expect(instance.state.checkOutActive).toBe(false);
  });

  it('Should change show calendar to false after selecting check out and check in date', () => {
    instance.handleCheckInClick();
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 23,
      year: 2018,
      price: '642.00',
      available: true,
    });
    instance.handleDateClick({
      listing_id: 1,
      minimum_stay: 3,
      maximum_guests: 2,
      month: 1,
      day: 24,
      year: 2018,
      price: '341.00',
      available: true,
    });
    expect(instance.state.showCalendar).toBe(false);
  });

  it('Should set showGuestDialog to true, when guest div is clicked first time', () => {
    wrapper = mount(<App id={1} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(false);
    wrapper.find('#guests-button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(true);
  });

  it('Should set showGuestDialog to false, when guest div is clicked when it is already open', () => {
    wrapper = mount(<App id={1} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(false);
    wrapper.find('#guests-button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(true);
    wrapper.find('#guests-button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(false);
  });

  it('Should set showGuestDialog to false, when dialog is open and click outside of dialog', () => {
    wrapper = mount(<App id={1} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(false);
    wrapper.find('#guests-button').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(true);
    wrapper.find('#checkout').simulate('click');
    expect(wrapper.state('showGuestDialog')).toBe(false);
  });

  it('Should increment guests properly based on type', () => {
    expect(instance.state.guests.adults).toBe(1);
    expect(instance.incrementGuests('adults'));
    expect(instance.state.guests.adults).toBe(2);
    expect(instance.state.guests.children).toBe(0);
    expect(instance.state.guests.infants).toBe(0);
    expect(instance.incrementGuests('children'));
    expect(instance.state.guests.adults).toBe(2);
    expect(instance.state.guests.children).toBe(1);
    expect(instance.state.guests.infants).toBe(0);
    expect(instance.incrementGuests('infants'));
    expect(instance.state.guests.adults).toBe(2);
    expect(instance.state.guests.children).toBe(1);
    expect(instance.state.guests.infants).toBe(1);
  });

  it('Should decrement guests properly based on type', () => {
    expect(instance.state.guests.adults).toBe(1);
    expect(instance.decrementGuests('adults'));
    expect(instance.state.guests.adults).toBe(0);
    expect(instance.state.guests.children).toBe(0);
    expect(instance.state.guests.infants).toBe(0);
    expect(instance.decrementGuests('children'));
    expect(instance.state.guests.adults).toBe(0);
    expect(instance.state.guests.children).toBe(-1);
    expect(instance.state.guests.infants).toBe(0);
    expect(instance.decrementGuests('infants'));
    expect(instance.state.guests.adults).toBe(0);
    expect(instance.state.guests.children).toBe(-1);
    expect(instance.state.guests.infants).toBe(-1);
  });
});
