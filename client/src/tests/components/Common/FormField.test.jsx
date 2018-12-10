import React from 'react';
import { mount } from 'enzyme';
import FormField from '../../../components/Common/FormField';

const setup = () => {
  const props = {
    placeholder: '',
    icon: '',
    name: 'username',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    loading: false
  };

  const wrapper = mount(<FormField {...props} />);

  return { wrapper, props };
};

describe('FormField Component', () => {
  const { wrapper } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
