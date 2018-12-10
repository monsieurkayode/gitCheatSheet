import React from 'react';
import { mount } from 'enzyme';
import Container from '../../../components/Common/Container';

describe('Container Component', () => {
  const wrapper = mount(<Container />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
