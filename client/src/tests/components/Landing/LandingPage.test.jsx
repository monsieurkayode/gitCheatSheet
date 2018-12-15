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
    },
    searchTerm: ''
  };

  const wrapper = shallow(<LandingPage {...props} />);

  return { wrapper, props };
};

describe('LandingPage Component', () => {
  const { wrapper } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return an object', () => {
      expect(mapStateToProps({
        cheatSheets: { categories: [], searchTerm: '' }
      }))
        .toBeInstanceOf(Object);
    });
  });
});
