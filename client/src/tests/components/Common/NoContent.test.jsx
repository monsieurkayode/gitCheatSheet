import React from 'react';
import { mount } from 'enzyme';
import NoContent from '../../../components/Common/NoContent';

describe('NoContent Component', () => {
  it('should render correctly and does not crash', () => {
    const wrapper = mount(<NoContent content="No content found" />);
    expect(wrapper).toMatchSnapshot();
  });
});
