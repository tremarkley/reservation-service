import React from 'react';
import { shallow } from 'enzyme';
import App from '../app/app';

describe('<App /> component', () => {
  it('Clicking book button should render popup component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
