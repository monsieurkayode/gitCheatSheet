import React from 'react';
import { shallow } from 'enzyme';
import { SearchDisplay } from '../../../components/Landing/SearchDisplay';

const setup = () => {
  const props = {
    cheats: [
      {
        category: { name: 'install' },
        keywords: [],
        description: 'install',
        _id: '1'
      }
    ],
    loading: false
  };

  return shallow(<SearchDisplay {...props} />);
};

describe('SearchDisplay Component', () => {
  const wrapper = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
