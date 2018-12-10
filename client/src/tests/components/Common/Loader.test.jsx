import React from 'react';
import { mount } from 'enzyme';
import Loader from '../../../components/Common/Loader';

const setup = () => {
  const props = {
    size: 20,
    strokeColor: 'white',
    loading: true
  };

  return mount(<Loader {...props} />);
};

describe('Loader Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
