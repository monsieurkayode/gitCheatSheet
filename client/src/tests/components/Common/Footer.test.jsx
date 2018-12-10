import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../../components/Common/Footer';

describe('Footer Component', () => {
  it('should render correctly and without crashing', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
