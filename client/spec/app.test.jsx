import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../app/app';

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
});
