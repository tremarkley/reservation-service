import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../app/components/popup';
import ReservationData from './test_data/reservationData';

describe('<Popup /> Component', () => {
  it('should render a div', () => {
    const mockFunction = jest.fn();
    const wrapper = shallow(<Popup
      onClose={mockFunction}
      reservationData={ReservationData.obj}
      updateReservationData={mockFunction}
      showCalendar={false}
      checkInActive={false}
      checkOutActive={false}
      handleDateClick={mockFunction}
      handleCheckInClick={mockFunction}
      handleCheckOutClick={mockFunction}
      closeCalendar={mockFunction}
      handleClearDates={mockFunction}
    />);
    expect(wrapper.is('div')).toEqual(true);
  });
});
