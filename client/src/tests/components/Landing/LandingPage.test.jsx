import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage, mapStateToProps } from '../../../components/Landing/LandingPage';

const setup = () => {
  const props = {
    categories: [{
      _id: '1',
      name: 'Branch',
    }],
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<LandingPage {...props} />);

  return { wrapper, props };
};

describe('NavBar Component', () => {
  const { wrapper } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a SearchBar component', () => {
    const SearchBar = wrapper.find('SearchBar');
    expect(SearchBar.length).toBe(1);
  });

  describe('mapStateToProps', () => {
    it('should return an object', () => {
      expect(mapStateToProps({ cheatSheets: { categories: [] } }))
        .toBeInstanceOf(Object);
    });
  });
});
