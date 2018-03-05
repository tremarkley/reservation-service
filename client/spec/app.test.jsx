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
    wrapper = shallow(<App />);
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
    wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    wrapper.find('#checkin').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Clicking outside of checkin/checkout button should close calendar component', () => {
    wrapper = mount(<App />);
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

  it('Should set lastPossibleCheckInDate as the current check in date if there is one', () => {
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
});
