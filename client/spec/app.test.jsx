import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../app/app';
import reservationData from './test_data/reservationData';

describe('<App /> component', () => {
  it('Clicking book button should render popup component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
  //  these tests must be here because the functions for opening the calendar are at the app level
  it('Clicking checkin button should render calendar component', () => {
    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    wrapper.find('#checkin').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Clicking outside of checkin/checkout button should close calendar component', () => {
    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    wrapper.find('.pop-up').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should calculate lastPossibleCheckOutDate when a checkin is selected', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.updateReservationData(reservationData.array, 0, 2018);
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

  // it('Should calculate lastPossibleCheckInDate when a checkout is selected', () => {
  //   const wrapper = 
  // })
});
