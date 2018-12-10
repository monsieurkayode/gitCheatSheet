import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../../components/Common/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('should render correctly and does not crash', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
