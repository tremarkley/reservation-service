import React from 'react';
import Popup from '../app/components/popup';

describe('<Popup /> Component', () => {
  it('should render a div', () => {
    const wrapper = shallow(<Popup />);
    expect(wrapper.is('div')).toEqual(true);
  });
});