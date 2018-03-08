import React from 'react';
import { shallow } from 'enzyme';
import Guests from '../app/components/guests';

describe('<Guests /> Component', () => {
  it('Should disable plus button for adult and children when max number of guests is reached', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={4}
      guests={
        {
          adults: 3,
          children: 1,
          infants: 0,
        }
      }
    />);
    expect(wrapper.find('#plus-adults').prop('disabled')).toEqual(true);
    expect(wrapper.find('#plus-adults').find('span').prop('className')).toEqual('guests-counter-span-disabled');
    expect(wrapper.find('#plus-children').prop('disabled')).toEqual(true);
    expect(wrapper.find('#plus-children').find('span').prop('className')).toEqual('guests-counter-span-disabled');
    expect(wrapper.find('#plus-infants').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-infants').find('span').prop('className')).toEqual('guests-counter-span-active');
  });

  it('Should enable plus button for adult and children when max number of guests has not been reached', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 3,
          children: 1,
          infants: 0,
        }
      }
    />);
    expect(wrapper.find('#plus-adults').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-adults').find('span').prop('className')).toEqual('guests-counter-span-active');
    expect(wrapper.find('#plus-children').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-children').find('span').prop('className')).toEqual('guests-counter-span-active');
    expect(wrapper.find('#plus-infants').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-infants').find('span').prop('className')).toEqual('guests-counter-span-active');
  });

  it('Infants should not affect max guest count', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 3,
          children: 1,
          infants: 3,
        }
      }
    />);
    expect(wrapper.find('#plus-adults').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-adults').find('span').prop('className')).toEqual('guests-counter-span-active');
    expect(wrapper.find('#plus-children').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-children').find('span').prop('className')).toEqual('guests-counter-span-active');
    expect(wrapper.find('#plus-infants').prop('disabled')).toEqual(false);
    expect(wrapper.find('#plus-infants').find('span').prop('className')).toEqual('guests-counter-span-active');
  });

  it('Should disable minus button for adults at 1', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 1,
          children: 1,
          infants: 3,
        }
      }
    />);
    expect(wrapper.find('#minus-adults').prop('disabled')).toEqual(true);
    expect(wrapper.find('#minus-adults').find('span').prop('className')).toEqual('guests-counter-span-disabled');
  });

  it('Should disable minus button for infants and adults at 0', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 1,
          children: 0,
          infants: 0,
        }
      }
    />);
    expect(wrapper.find('#minus-children').prop('disabled')).toEqual(true);
    expect(wrapper.find('#minus-children').find('span').prop('className')).toEqual('guests-counter-span-disabled');
    expect(wrapper.find('#minus-infants').prop('disabled')).toEqual(true);
    expect(wrapper.find('#minus-infants').find('span').prop('className')).toEqual('guests-counter-span-disabled');
  });

  it('Should disable plus button for infants at 5', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 1,
          children: 0,
          infants: 5,
        }
      }
    />);
    expect(wrapper.find('#plus-infants').prop('disabled')).toEqual(true);
    expect(wrapper.find('#plus-infants').find('span').prop('className')).toEqual('guests-counter-span-disabled');
  });

  it('Should call decrement guests when minus button is active and clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 2,
          children: 1,
          infants: 3,
        }
      }
    />);
    wrapper.find('#minus-adults').simulate('click');
    wrapper.find('#minus-children').simulate('click');
    wrapper.find('#minus-infants').simulate('click');
    expect(mockFunc.mock.calls.length).toBe(3);
  });

  it('Should not call decrement guest if minus button is not active and clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 1,
          children: 0,
          infants: 0,
        }
      }
    />);
    wrapper.find('#minus-adults').simulate('click');
    wrapper.find('#minus-children').simulate('click');
    wrapper.find('#minus-infants').simulate('click');
    expect(mockFunc.mock.calls.length).toBe(0);
    expect(mockFunc.mock.calls.length).toBe(0);
    expect(mockFunc.mock.calls.length).toBe(0);
  });

  it('Should call increment guests when plus button is active and clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 2,
          children: 1,
          infants: 3,
        }
      }
    />);
    wrapper.find('#plus-adults').simulate('click');
    wrapper.find('#plus-children').simulate('click');
    wrapper.find('#plus-infants').simulate('click');
    expect(mockFunc.mock.calls.length).toBe(3);
  });

  it('Should not call increment guests when plus button is disabled and clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Guests
      incrementGuests={mockFunc}
      decrementGuests={mockFunc}
      closeGuestsDialog={mockFunc}
      maxGuests={5}
      guests={
        {
          adults: 5,
          children: 0,
          infants: 5,
        }
      }
    />);
    wrapper.find('#plus-adults').simulate('click');
    wrapper.find('#plus-children').simulate('click');
    wrapper.find('#plus-infants').simulate('click');
    expect(mockFunc.mock.calls.length).toBe(0);
  });
});
