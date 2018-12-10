import React from 'react';
import { mount } from 'enzyme';
import Button from '../../../components/Common/Button';

describe('Button Component', () => {
  const wrapper = mount(<Button />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
