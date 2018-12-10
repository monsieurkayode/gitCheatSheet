import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../../../components/Common/SearchBar';

const setup = () => {
  const props = {
    onFocus: jest.fn(),
    onChange: jest.fn(),
    searchTerm: '',
    search: false
  };

  return mount(<SearchBar {...props} />);
};

describe('SearchBar Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
