import React from 'react';
import { mount } from 'enzyme';
import { SearchBar } from '../../../components/Common/SearchBar';

const setup = () => {
  const props = {
    onChange: jest.fn(),
    searchTerm: ''
  };

  return mount(<SearchBar {...props} />);
};

describe('SearchBar Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
